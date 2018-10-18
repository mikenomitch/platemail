defmodule PlatemailWeb.Api.V1.AuthView do
  use PlatemailWeb, :view
  alias PlatemailWeb.Api.V1.UserView

  def render("login.json", %{user: user, token: token}) do
    IO.puts("IN LOGIN JSON")
    %{token: token, user: UserView.user_json(user)}
  end
end
