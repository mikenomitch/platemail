defmodule Platemail.Core do
  @moduledoc """
  The Core context.
  """

  import Ecto.Query, warn: false
  alias Platemail.Repo
  alias Platemail.Core.Widget

  @doc """
  Returns the list of widgets.

  ## Examples

      iex> list_widgets(%{"page" => 2})
      [%Widget{}, ...]

  """
  def list_widgets(params) do
    Widget |> Repo.paginate(params)
  end

  @doc """
  Gets a single widget.

  Returns nil if the Widget does not exist.

  ## Examples

      iex> get_widget(123)
      %Widget{}

      iex> get_widget(456)
      ** nil

  """
  def get_widget(id), do: Repo.get(Widget, id)

  @doc """
  Creates a widget.

  ## Examples

      iex> create_widget(%{field: value})
      {:ok, %Widget{}}

      iex> create_widget(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_widget(attrs \\ %{}) do
    %Widget{}
    |> Widget.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a widget.

  ## Examples

      iex> update_widget(widget, %{field: new_value})
      {:ok, %Widget{}}

      iex> update_widget(widget, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_widget(%Widget{} = widget, attrs) do
    widget
    |> Widget.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Widget.

  ## Examples

      iex> delete_widget(widget)
      {:ok, %Widget{}}

      iex> delete_widget(widget)
      {:error, %Ecto.Changeset{}}

  """
  def delete_widget(%Widget{} = widget) do
    Repo.delete(widget)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking widget changes.

  ## Examples

      iex> change_widget(widget)
      %Ecto.Changeset{source: %Widget{}}

  """
  def change_widget(%Widget{} = widget) do
    Widget.changeset(widget, %{})
  end
end
