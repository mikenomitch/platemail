defmodule PlatemailWeb.PageController do
  use PlatemailWeb, :controller

  def index(conn, _params) do
    path = Application.app_dir(:platemail_web, "priv/static/index.html")

    conn
    |> put_resp_header("content-type", "text/html; charset=utf-8")
    |> Plug.Conn.send_file(200, path)
  end
end
