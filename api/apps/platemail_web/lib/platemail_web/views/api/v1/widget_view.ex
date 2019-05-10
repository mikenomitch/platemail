defmodule PlatemailWeb.Api.V1.WidgetView do
  use PlatemailWeb, :view

  def render("index.json", %{widgets: widgets}) do
    %{data: render_many(widgets, __MODULE__, "widget.json")}
  end

  def render("show.json", %{widget: widget}) do
    %{data: render_one(widget, __MODULE__, "widget.json")}
  end

  def render("widget.json", %{widget: widget}) do
    %{id: widget.id, title: widget.title, content: widget.content}
  end
end
