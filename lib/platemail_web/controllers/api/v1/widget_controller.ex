defmodule PlatemailWeb.Api.V1.WidgetController do
  use PlatemailWeb, :controller

  alias Platemail.Core
  alias Platemail.Core.Widget

  action_fallback(PlatemailWeb.FallbackController)

  def index(conn, _params) do
    widgets = Core.list_widgets()
    render(conn, "index.json", widgets: widgets)
  end

  def create(conn, %{"widget" => widget_params}) do
    with {:ok, %Widget{} = widget} <- Core.create_widget(widget_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", widget_path(conn, :show, widget))
      |> render("show.json", widget: widget)
    end
  end

  def show(conn, %{"id" => id}) do
    widget = Core.get_widget!(id)
    render(conn, "show.json", widget: widget)
  end

  def update(conn, %{"id" => id, "widget" => widget_params}) do
    widget = Core.get_widget!(id)

    with {:ok, %Widget{} = widget} <- Core.update_widget(widget, widget_params) do
      render(conn, "show.json", widget: widget)
    end
  end

  def delete(conn, %{"id" => id}) do
    widget = Core.get_widget!(id)

    with {:ok, %Widget{}} <- Core.delete_widget(widget) do
      send_resp(conn, :no_content, "")
    end
  end
end
