defmodule PlatemailWeb.Authentication.ErrorHandler do
  import Plug.Conn

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
