defmodule PlatemailWeb.PageController do
  use PlatemailWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
