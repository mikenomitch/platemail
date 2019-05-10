defmodule PlatemailWeb.UserSocket do
  use Phoenix.Socket
  channel("users:*", PlatemailWeb.UsersChannel)

  def connect(_params, socket) do
    {:ok, socket}
  end

  def id(_socket), do: nil
end
