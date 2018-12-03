defmodule PlatemailWeb.PageController do
  use PlatemailWeb, :controller
  alias Platemail.Accounts.{Authentication, User}
  alias Platemail.Repo

  def index(conn, _params) do
    serve_application(conn)
    resource = Repo.all(User) |> List.first()

    IO.puts("RESOURCE")
    IO.inspect(resource)

    {:ok, token, claims} =
      Platemail.Accounts.Authentication.encode_and_sign(
        resource,
        %{},
        token_type: "magic_login",
        ttl: {60, :minute}
      )

    IO.puts("token")
    IO.inspect(token)

    IO.puts("issueing claims")
    IO.inspect(claims)

    IO.puts("I MADE THIS")
  end

  def confirm_email(conn, %{"token" => _token}) do
    serve_application(conn)
  end

  def magic_login(conn, %{"token" => token}) do
    with {:ok, claims} <- Authentication.decode_and_verify(token, %{"typ" => "magic_login"}),
         user = %User{} <- Repo.get(User, claims["sub"]) |> Repo.preload(:credentials),
         {:ok, auth_token, _claims} <- Authentication.encode_and_sign(user, %{}) do
      conn |> redirect(to: "/logged_in?as_user=#{auth_token}")
    else
      any ->
        IO.puts("Error")
        IO.inspect(any)

        serve_application(conn)
    end
  end

  def password_reset(conn, %{"token" => _token}) do
    serve_application(conn)
  end

  defp serve_application(conn) do
    path = Application.app_dir(:platemail_web, "priv/static/index.html")

    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, path)
  end
end
