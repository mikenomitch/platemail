defmodule PlatemailWeb.Api.V1.MetadataController do
  use PlatemailWeb, :controller

  alias Platemail.Core

  action_fallback(PlatemailWeb.Api.V1.FallbackController)

  @type conn_t :: Plug.Conn.t()

  @spec show(conn_t, map) :: conn_t
  def show(conn, _params) do
    render(conn, "metadata.json")
  end
end
