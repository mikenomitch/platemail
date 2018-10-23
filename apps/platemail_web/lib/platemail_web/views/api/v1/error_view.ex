defmodule PlatemailWeb.Api.V1.ErrorView do
  use PlatemailWeb, :view

  def render("error.json", %{message: message}) do
    %{message: message}
  end
end
