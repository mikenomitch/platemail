defmodule Platemail.Core do
  @moduledoc """
  The Core context.
  """

  import Ecto.Query, warn: false
  alias Platemail.Repo
  alias Platemail.Core.Widget

  @type db_res :: {:ok, Widget.t()} | {:error, %Ecto.Changeset{}}

  @doc """
  Returns the list of widgets.
  """
  @spec list_widgets(map) :: [Widget.t()]
  def list_widgets(params) do
    Widget |> Repo.paginate(params)
  end

  @doc """
  Gets a single widget.

  Returns nil if the Widget does not exist.
  """
  @spec list_widgets(map) :: Widget.t() | nil
  def get_widget(id), do: Repo.get(Widget, id)

  @doc """
  Creates a widget.
  """
  @spec create_widget(map) :: db_res
  def create_widget(attrs \\ %{}) do
    %Widget{}
    |> Widget.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a widget.
  """
  @spec update_widget(Widget.t(), map) :: db_res
  def update_widget(%Widget{} = widget, attrs) do
    widget
    |> Widget.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Widget.
  """
  @spec delete_widget(Widget.t()) :: db_res
  def delete_widget(%Widget{} = widget) do
    Repo.delete(widget)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking widget changes.
  """
  @spec change_widget(Widget.t()) :: %Ecto.Changeset{}
  def change_widget(%Widget{} = widget) do
    Widget.changeset(widget, %{})
  end
end
