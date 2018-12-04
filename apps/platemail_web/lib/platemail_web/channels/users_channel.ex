defmodule PlatemailWeb.UsersChannel do
  use Phoenix.Channel
  alias Platemail.Accounts.{Authentication}

  # Data broadcast to everybody
  def join("users:general", _message, socket) do
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
end
