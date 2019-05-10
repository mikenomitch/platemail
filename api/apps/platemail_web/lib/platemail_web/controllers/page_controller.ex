defmodule PlatemailWeb.PageController do
  use PlatemailWeb, :controller
  alias Platemail.Accounts.{Authentication, User}
  alias Platemail.Repo

  def index(conn, _params) do
    serve_application(conn)
  end

  def healthcheck(conn, _params) do
    IO.puts "healthcheck"
    msg = "Healthy - #{System.get_env("FOO")}"
    IO.puts msg
    Plug.Conn.send_resp(conn, 200, msg)
  end

  def login_link(conn, %{"token" => token}) do
    with {:ok, claims} <- Authentication.decode_and_verify(token, %{"typ" => "login_link"}),
         user = %User{} <- Repo.get(User, claims["sub"]) |> Repo.preload(:credentials),
         {:ok, auth_token, _claims} <- Authentication.encode_and_sign(user, %{}) do
      conn |> redirect(to: "/logged_in?token=#{auth_token}")
    else
      _ -> serve_application(conn)
    end
  end

  defp serve_application(conn) do
    path = Application.app_dir(:platemail_web, "priv/static/index.html")

    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, path)
  end
end
