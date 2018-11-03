defmodule PlatemailWeb.PageController do
  use PlatemailWeb, :controller

  def index(conn, _params) do
    path = Application.app_dir(:platemail_web, "priv/static/index.html")
    Plug.Conn.send_file(conn, 200, path)
  end
end
