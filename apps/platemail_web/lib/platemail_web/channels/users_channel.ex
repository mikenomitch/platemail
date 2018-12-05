defmodule PlatemailWeb.UsersChannel do
  use Phoenix.Channel
  alias Platemail.Accounts.{Authentication}
  alias Platemail.Core.{Widget}
  alias PlatemailWeb.Api.V1.WidgetView

  @base_event_types [:created, :updated, :deleted]
  @endpoint PlatemailWeb.Endpoint
  @general_channel "users:general"

  # Data broadcast to everybody
  def join(@general_channel, _message, socket) do
    {:ok, socket}
  end

  # Data broadcast to specific user
  def join("users:" <> user_id, %{"token" => token}, socket) do
    with {:ok, %{"sub" => ^user_id}} <- Authentication.decode_and_verify(token) do
      {:ok, socket}
    else
      _ -> {:error, %{reason: "unauthorized"}}
    end
  end

  @spec broadcast_widget_event(Widget.t(), atom) :: any
  def broadcast_widget_event(widget, type) when type in @base_event_types do
    widget_json = WidgetView.render("widget.json", %{widget: widget})
    event_body = %{type: type, item: widget_json}
    @endpoint.broadcast(@general_channel, "widget_event", event_body)
  end
end
