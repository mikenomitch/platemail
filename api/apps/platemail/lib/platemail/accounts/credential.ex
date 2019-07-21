defmodule Platemail.Accounts.Credential do
  @moduledoc """
  Saves Credentials, such as email & password and associates
  them with users via uid (user email)
  """

  use Ecto.Schema
  import Ecto.Changeset

  alias Platemail.{
    Accounts.User,
    Repo
  }

  # ===========================
  # ECTO CONFIG
  # ===========================

  schema "credentials" do
    field(:provider, :string)
    field(:uid, :string)
    field(:token, :string)
    field(:refresh_token, :string)
    field(:expires_at, :integer)
    field(:password, :string, virtual: true)
    field(:password_confirmation, :string, virtual: true)

    belongs_to(:user, User)

    timestamps()
  end

  @required_fields ~w(provider uid user_id token)a
  @optional_fields ~w(refresh_token expires_at)a

  @doc """
  Creates a changeset based on the `model` and `params`.
  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint(:provider_uid)
  end

  @spec validate_password_and_confirmation(binary, any) ::
          :ok | {:error, :password_does_not_match | :password_length_is_less_than_6}
  def validate_password_and_confirmation(pw, pwc) do
    case validate_password(pw) do
      :ok -> validate_pw_confirmation(pw, pwc)
      err -> err
    end
  end

  @spec validate_password(binary) :: :ok | {:error, :password_length_is_less_than_6}
  def validate_password(pw) do
    if String.length(pw) >= 6 do
      :ok
    else
      {:error, :password_length_is_less_than_6}
    end
  end

  @spec validate_pw_confirmation(any, any) :: :ok | {:error, :password_does_not_match}
  def validate_pw_confirmation(pw, pwc) do
    if pw == pwc do
      :ok
    else
      {:error, :password_does_not_match}
    end
  end

  @spec validate_current_password(any, any) :: :ok | {:error, :old_password_does_not_match}
  def validate_current_password(uid, current_pw) do
    auth = Repo.get_by(__MODULE__, uid: uid)

    case Pbkdf2.check_pass(current_pw, auth.token) do
      {:ok, _} -> :ok
      _ -> {:error, :old_password_does_not_match}
    end
  end

  @spec update_authorization_for_user_params(map) :: any
  def update_authorization_for_user_params(%{
        "password" => pw,
        "password_confirmation" => pwc,
        "email" => uid
      }) do
    case validate_password_and_confirmation(pw, pwc) do
      :ok -> update_pw(String.downcase(uid), pw)
      err -> err
    end
  end

  defp update_pw(uid, pw) do
    __MODULE__
    |> Repo.get_by(uid: uid)
    |> __MODULE__.changeset(%{token: Pbkdf2.hash_pwd_salt(pw)})
    |> Repo.update()
  end
end
