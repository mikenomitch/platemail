defmodule PlatemailWeb.Api.V1.MetadataView do
  use PlatemailWeb, :view

  def render("metadata.json", _params) do
    %{node_list: Node.list()}
  end
end
