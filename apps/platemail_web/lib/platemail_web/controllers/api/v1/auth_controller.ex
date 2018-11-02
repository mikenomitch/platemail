defmodule PlatemailWeb.Api.V1.AuthController do
  use PlatemailWeb, :controller

  alias Platemail.{
    Accounts.Authentication,
    Repo
  }

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
      |> json(%{message: "TODO: error"})
    end
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_failure: _fails}} = conn, _params) do
    conn
    |> put_status(401)
    |> json(%{message: "TODO: error"})
  end

  def callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    current_user = Authentication.Plug.current_resource(conn)

    case Authentication.get_or_insert_user_from_auth(auth, current_user, Repo) do
      {:ok, user} ->
        {:ok, token, claims} = Authentication.encode_and_sign(user, %{})

        conn
        |> put_status(200)
        |> put_resp_header("authorization", "Bearer #{token}")
        |> render("login.json", user: user, token: token)

      {:error, error} ->
        conn
        |> put_status(401)
        |> json(%{message: "TODO: error"})
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
      |> json(%{message: "Logged in"})
    else
      conn |> json(%{message: "TODO: ERROR"})
    end
  end
end
