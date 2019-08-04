defmodule PlatemailWeb.Api.V1.UserView do
  use PlatemailWeb, :view

  def render("index.json", %{users: users}) do
    %{data: render_many(users, __MODULE__, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, __MODULE__, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{
      id: user.id,
      email: user.email,
      name: user.name,
      nodes: Node.list
    }
  end

  def user_json(user) do
    %{
      id: user.id,
      email: user.email,
      name: user.name,
      nodes: Node.list
    }
  end
end
