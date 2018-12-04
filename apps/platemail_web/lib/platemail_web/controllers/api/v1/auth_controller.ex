defmodule PlatemailWeb.Api.V1.AuthController do
  use PlatemailWeb, :controller

  alias Platemail.{
    Accounts.Authentication,
    Accounts.Credential,
    Accounts.User,
    Accounts.UserQueries,
    Email,
    Repo
  }

  action_fallback(PlatemailWeb.Api.V1.FallbackController)

  plug(Ueberauth)

  def login(conn, _params) do
    current_user = Authentication.Plug.current_resource(conn)

    if current_user do
      conn
      |> Authentication.Plug.remember_me(current_user)
      |> put_flash(:info, "Signed in as #{current_user.name}")
      |> redirect(to: "/")
    else
      conn
      |> put_status(401)
      |> json(%{message: "There was an error signing in."})
    end
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_status(401)
    |> json(%{message: "There was an error signing in."})
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    current_user = Authentication.Plug.current_resource(conn)

    case Authentication.get_or_insert_user_from_auth(auth, current_user, Repo) do
      {:ok, user} ->
        {:ok, token, _claims} = Authentication.encode_and_sign(user, %{})

        conn
        |> put_status(200)
        |> put_resp_header("authorization", "Bearer #{token}")
        |> render("login.json", user: user, token: token)

      {:error, _error} ->
        conn
        |> put_status(401)
        |> json(%{message: "There was an error signing in."})
    end
  end

  def reset_password(conn, %{"reset_token" => reset_token, "password" => password}) do
    with {:ok, claims} <-
           Authentication.decode_and_verify(reset_token, %{"typ" => "password_reset"}),
         user = %User{} <- Repo.get(User, claims["sub"]),
         params = %{
           "password" => password,
           "password_confirmation" => password,
           "email" => user.email
         },
         {:ok, _credential} <- Credential.update_authorization_for_user_params(params) do
      conn |> json(%{message: "Password Reset"})
    else
      _ ->
        {:error, :unauthorized, "There was an issue updating your password"}
    end
  end

  def logout(conn, _params) do
    current_user = Authentication.Plug.current_resource(conn)

    if current_user do
      conn
      # This clears the whole session.
      # We could use sign_out(:default) to just revoke this token
      # but I prefer to clear out the session. This means that because we
      # use tokens in two locations - :default and :admin - we need to load it (see above)
      |> Authentication.Plug.sign_out()
      |> json(%{message: "Signed Out"})
    else
      conn |> json(%{message: "There was an issue logging out"})
    end
  end

  def password_reset_request(conn, %{"email" => email}) do
    with user = %User{} <- UserQueries.get_by_email(email) do
      {:ok, token, _claims} =
        Platemail.Accounts.Authentication.encode_and_sign(
          user,
          %{},
          token_type: "password_reset",
          ttl: {60, :minute}
        )

      Email.send_password_reset(user.email, token)

      json(conn, %{message: "Password Reset Sent"})
    else
      _ -> {:error, :not_found, "User not found"}
    end
  end

  def login_link_request(conn, %{"email" => email}) do
    with user = %User{} <- UserQueries.get_by_email(email) do
      {:ok, token, _claims} =
        Platemail.Accounts.Authentication.encode_and_sign(
          user,
          %{},
          token_type: "login_link",
          ttl: {60, :minute}
        )

      Email.send_login_link(user.email, token)

      json(conn, %{message: "Login Email Sent"})
    else
      _ -> {:error, :not_found, "User not found"}
    end
  end
end
