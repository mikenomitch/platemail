defmodule PlatemailWeb.WidgetView do
  use PlatemailWeb, :view
  alias PlatemailWeb.WidgetView

  def render("index.json", %{widgets: widgets}) do
    %{data: render_many(widgets, WidgetView, "widget.json")}
  end

  def render("show.json", %{widget: widget}) do
    %{data: render_one(widget, WidgetView, "widget.json")}
  end

  def render("widget.json", %{widget: widget}) do
    %{id: widget.id,
      title: widget.title,
      content: widget.content}
  end
end
