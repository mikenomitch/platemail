defmodule Platemail.Accounts.Authentication do
  @moduledoc """
  Authentication module.

  See: https://github.com/ueberauth/guardian for more info
  """

  use Guardian, otp_app: :platemail

  alias Platemail.Accounts.{Credential, User}

  @doc """
  # You can use any value for the subject of your token but
  # it should be useful in retrieving the resource later, see
  # how it being used on `resource_from_claims/1` function.
  # A unique `id` is a good subject, a non-unique email address
  # is a poor subject.

  Needed for Guardian
  """
  def subject_for_token(resource, _claims) do
    sub = to_string(resource.id)
    {:ok, sub}
  end

  @doc """
  # Here we'll look up our resource from the claims, the subject can be
  # found in the `"sub"` key. In `above subject_for_token/2` we returned
  # the resource id so here we'll rely on that to look it up.

  Needed for Guardian
  """
  def resource_from_claims(claims) do
    subject_id = claims["sub"]
    user = Platemail.Accounts.get_user!(subject_id)
    {:ok, user}
  end

  def get_or_insert_user_from_auth(auth, current_user, repo) do
    case auth_and_validate(auth, repo) do
      {:error, :not_found} ->
        register_user_from_auth(auth, current_user, repo)

      {:error, reason} ->
        {:error, reason}

      credential ->
        if credential.expires_at && Time.compare(credential.expires_at, Time.utc_now()) == :gt do
          replace_credential(credential, auth, current_user, repo)
        else
          user_from_credential(credential, current_user, repo)
        end
    end
  end

  def replace_credential(credential, auth, current_user, repo) do
    case validate_auth_for_registration(auth) do
      :ok ->
        case user_from_credential(credential, current_user, repo) do
          {:ok, user} ->
            case repo.transaction(fn ->
                   repo.delete(credential)
                   credential_from_auth(user, auth, repo)
                   user
                 end) do
              {:ok, user} -> {:ok, user}
              {:error, reason} -> {:error, reason}
            end

          {:error, reason} ->
            {:error, reason}
        end

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp auth_and_validate(%{provider: :identity} = auth, repo) do
    try do
      case repo.get_by(Credential, uid: uid_from_auth(auth), provider: to_string(auth.provider)) do
        nil ->
          {:error, :not_found}

        credential ->
          case auth.credentials.other.password do
            pass when is_binary(pass) ->
              if Comeonin.Pbkdf2.check_pass(auth.credentials.other.password, credential.token) do
                credential
              else
                {:error, :password_does_not_match}
              end

            _ ->
              {:error, :password_required}
          end
      end
    rescue
      error ->
        IO.inspect(error)
        {:error, :email_not_valid}
    end
  end

  defp auth_and_validate(%{provider: service} = auth, repo)
       when service in [:google, :facebook, :github] do
    case repo.get_by(Credential, uid: uid_from_auth(auth), provider: to_string(auth.provider)) do
      nil ->
        {:error, :not_found}

      credential ->
        if credential.uid == uid_from_auth(auth) do
          credential
        else
          {:error, :uid_mismatch}
        end
    end
  end

  defp auth_and_validate(auth, repo) do
    case repo.get_by(Credential, uid: uid_from_auth(auth), provider: to_string(auth.provider)) do
      nil ->
        {:error, :not_found}

      credential ->
        if credential.token == auth.credentials.token do
          credential
        else
          {:error, :token_mismatch}
        end
    end
  end

  defp register_user_from_auth(auth, current_user, repo) do
    case validate_auth_for_registration(auth) do
      :ok ->
        case repo.transaction(fn -> create_user_from_auth(auth, current_user, repo) end) do
          {:ok, response} -> response
          {:error, _reason} -> {:error, "there was an issue creating this user"}
        end

      {:error, reason} ->
        {:error, reason}
    end
  end

  defp create_user_from_auth(auth, current_user, repo) do
    user = current_user || repo.get_by(User, email: auth.info.email) || create_user(auth, repo)

    credential_from_auth(user, auth, repo)
    {:ok, user}
  end

  defp create_user(auth, repo) do
    name = name_from_auth(auth)

    result =
      User.registration_changeset(%User{}, scrub(%{email: auth.info.email, name: name}))
      |> repo.insert

    case result do
      {:ok, user} -> user
      {:error, reason} -> repo.rollback(reason)
    end
  end

  # We need to check the pw for the identity provider
  defp validate_auth_for_registration(%Credential{provider: :identity} = auth) do
    pw = Map.get(auth.credentials.other, :password)
    pwc = Map.get(auth.credentials.other, :password_confirmation)
    email = auth.info.email

    case pw do
      nil ->
        {:error, :password_is_null}

      "" ->
        {:error, :password_empty}

      ^pwc ->
        validate_pw_length(pw, email)

      _ ->
        {:error, :password_confirmation_does_not_match}
    end
  end

  # All the other providers are oauth so should be good
  defp validate_auth_for_registration(_auth), do: :ok

  defp user_from_credential(credential, current_user, repo) do
    case repo.one(Ecto.assoc(credential, :user)) do
      nil ->
        {:error, :user_not_found}

      user ->
        if current_user && current_user.id != user.id do
          {:error, :user_does_not_match}
        else
          {:ok, user}
        end
    end
  end

  defp credential_from_auth(user, auth, repo) do
    credential = Ecto.build_assoc(user, :credentials)

    result =
      Credential.changeset(
        credential,
        scrub(%{
          provider: to_string(auth.provider),
          uid: uid_from_auth(auth),
          token: token_from_auth(auth),
          refresh_token: auth.credentials.refresh_token,
          expires_at: auth.credentials.expires_at,
          password: password_from_auth(auth),
          password_confirmation: password_confirmation_from_auth(auth)
        })
      )
      |> repo.insert

    case result do
      {:ok, the_auth} -> the_auth
      {:error, reason} -> repo.rollback(reason)
    end
  end

  defp name_from_auth(auth) do
    if auth.info.name do
      auth.info.name
    else
      [auth.info.first_name, auth.info.last_name]
      |> Enum.filter(&(&1 != nil and String.trim(&1) != ""))
      |> Enum.join(" ")
    end
  end

  defp validate_pw_length(pw, email) when is_binary(pw) do
    if String.length(pw) >= 6 do
      validate_email(email)
    else
      {:error, :password_length_is_less_than_6}
    end
  end

  defp validate_email(email) when is_binary(email) do
    User.validate_email(email)
  end

  defp token_from_auth(%{provider: :identity} = auth) do
    case auth do
      %{credentials: %{other: %{password: pass}}} when not is_nil(pass) ->
        Comeonin.Pbkdf2.hashpwsalt(pass)

      _ ->
        nil
    end
  end

  defp token_from_auth(auth), do: auth.credentials.token
  defp uid_from_auth(auth), do: auth.uid
  defp password_from_auth(%{provider: :identity} = auth), do: auth.credentials.other.password
  defp password_from_auth(_), do: nil

  defp password_confirmation_from_auth(%{provider: :identity} = auth) do
    auth.credentials.other.password_confirmation
  end

  defp password_confirmation_from_auth(_), do: nil

  # We don't have any nested structures in our params that we are using scrub with so this is a very simple scrub
  defp scrub(params) do
    result =
      Enum.filter(params, fn
        {_key, val} when is_binary(val) -> String.trim(val) != ""
        {_key, val} when is_nil(val) -> false
        _ -> true
      end)
      |> Enum.into(%{})

    result
  end
end
