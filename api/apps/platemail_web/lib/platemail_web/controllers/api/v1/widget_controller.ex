defmodule PlatemailWeb.Api.V1.WidgetController do
  use PlatemailWeb, :controller
  use PlatemailWeb.Api.V1.WidgetDocs

  alias Platemail.Core
  alias Platemail.Core.Widget

  action_fallback(PlatemailWeb.Api.V1.FallbackController)

  @type conn_t :: Plug.Conn.t()

  @spec index(conn_t, keyword | map) :: conn_t
  def index(conn, params) do
    widgets = Core.list_widgets(params)
    render(conn, "index.json", widgets: widgets)
  end

  @spec create(conn_t, map) :: {:error, Ecto.Changeset.t()} | conn_t
  def create(conn, %{"widget" => widget_params}) do
    with {:ok, %Widget{} = widget} <- Core.create_widget(widget_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", widget_path(conn, :show, widget))
      |> render("show.json", widget: widget)
    end
  end

  @spec show(conn_t, map) :: {:error, :not_found} | conn_t
  def show(conn, %{"id" => id}) do
    with %Widget{} = widget <- Core.get_widget(id) do
      render(conn, "show.json", widget: widget)
    else
      _ -> {:error, :not_found}
    end
  end

  @spec update(conn_t, map) :: {:error, :not_found} | {:error, Ecto.Changeset.t()} | conn_t
  def update(conn, %{"id" => id, "widget" => widget_params}) do
    with {:widget, %Widget{} = widget} <- {:widget, Core.get_widget(id)},
         {:ok, %Widget{} = widget} <- Core.update_widget(widget, widget_params) do
      render(conn, "show.json", widget: widget)
    else
      {:widget, _error} -> {:error, :not_found}
      error -> error
    end
  end

  @spec delete(conn_t, map) ::
          {:error, :not_found | Ecto.Changeset.t()} | conn_t
  def delete(conn, %{"id" => id}) do
    with {:widget, %Widget{} = widget} <- {:widget, Core.get_widget(id)},
         {:ok, %Widget{}} <- Core.delete_widget(widget) do
      send_resp(conn, :no_content, "")
    else
      {:widget, _error} -> {:error, :not_found}
      error -> error
    end
  end
end
