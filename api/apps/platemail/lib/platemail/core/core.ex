defmodule Platemail.Core do
  @moduledoc """
  The Core context.
  """

  import Ecto.Query, warn: false
  alias Platemail.Repo
  alias Platemail.Core.Widget

  @doc """
  Returns the list of widgets.
  """
  def list_widgets(params) do
    Widget |> Repo.paginate(params)
  end

  @doc """
  Gets a single widget.

  Returns nil if the Widget does not exist.
  """
  def get_widget(id), do: Repo.get(Widget, id)

  @doc """
  Creates a widget.
  """
  def create_widget(attrs \\ %{}) do
    %Widget{}
    |> Widget.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a widget.
  """
  def update_widget(%Widget{} = widget, attrs) do
    widget
    |> Widget.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Widget.
  """
  def delete_widget(%Widget{} = widget) do
    Repo.delete(widget)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking widget changes.
  """
  def change_widget(%Widget{} = widget) do
    Widget.changeset(widget, %{})
  end
end
