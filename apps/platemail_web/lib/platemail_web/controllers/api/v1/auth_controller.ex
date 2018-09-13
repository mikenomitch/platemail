defmodule PlatemailWeb.AuthController do
  use PlatemailWeb, :controller

  alias Platemail.{
    Accounts,
    Accounts.User,
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
      render(conn, "login.html", current_user: nil, current_auths: [])
    end
  end

  def identity_callback(%Plug.Conn{assigns: %{ueberauth_failure: fails}} = conn, _params) do
    current_user = Authentication.Plug.current_resource(conn)

    conn
    |> put_flash(:error, hd(fails.errors).message)
    |> render("login.html", current_user: current_user, current_auths: auths(current_user))
  end

  def identity_callback(%Plug.Conn{assigns: %{ueberauth_auth: auth}} = conn, _params) do
    current_user = Authentication.Plug.current_resource(conn)

    case Authentication.get_or_insert_user_from_auth(auth, current_user, Repo) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "Signed in as #{user.name}")
        |> Authentication.Plug.sign_in(user, token_type: :access)
        |> redirect(to: "/stream")

      {:error, error} ->
        conn
        |> put_flash(:error, "Could not authenticate. Error: #{error}")
        |> render("login.html", current_user: current_user, current_auths: auths(current_user))
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
      |> put_flash(:info, "Signed out")
      |> redirect(to: "/")
    else
      conn
      |> put_flash(:info, "Not logged in")
      |> redirect(to: "/")
    end
  end

  defp auths(nil), do: []

  defp auths(%User{} = user) do
    Ecto.assoc(user, :authorizations)
    |> Repo.all()
    |> Enum.map(& &1.provider)
  end
end
