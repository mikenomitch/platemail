defmodule PlatemailWeb.Authentication.ErrorHandler do
  import Plug.Conn

  @type conn_t :: Plug.Conn.t()

  @spec auth_error(conn_t, {any, any}, map) :: conn_t
  def auth_error(conn, {_type, _reason}, _opts) do
    conn
    |> put_status(:forbidden)
    |> Phoenix.Controller.render(
      PlatemailWeb.Api.V1.ErrorView,
      "error.json",
      %{message: "You are not authorized to access this resource."}
    )
  end
end
