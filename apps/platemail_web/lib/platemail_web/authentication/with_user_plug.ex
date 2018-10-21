defmodule PlatemailWeb.Authentication.WithUser do
  def init(default), do: default

  def call(conn, _) do
    user = Guardian.Plug.current_resource(conn)
    Map.merge(conn, %{user: user})
  end
end
