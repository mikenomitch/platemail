defmodule PlatemailWeb.UserSocket do
  use Phoenix.Socket
  channel("users:*", PlatemailWeb.UsersChannel)

  @spec connect(map, any) :: {:ok, any}
  def connect(_params, socket) do
    {:ok, socket}
  end

  @spec id(any) :: nil
  def id(_socket), do: nil
end
