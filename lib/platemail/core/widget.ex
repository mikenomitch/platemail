defmodule Platemail.Core.Widget do
  use Ecto.Schema
  import Ecto.Changeset

  schema "widgets" do
    field(:content, :string)
    field(:title, :string)
    field(:user_id, :id)

    timestamps()
  end

  @doc false
  def changeset(widget, attrs) do
    widget
    |> cast(attrs, [:title, :content])
    |> validate_required([:title, :content])
  end
end
