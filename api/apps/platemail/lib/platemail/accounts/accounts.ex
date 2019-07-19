defmodule Platemail.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false

  alias Platemail.{
    Accounts.User,
    Repo
  }

  @type db_res :: {:ok, User.t()} | {:error, %Ecto.Changeset{}}

  @spec list_users() :: [User.t()]
  def list_users do
    Repo.all(User)
  end

  @spec get_user!(number) :: User.t()
  def get_user!(id), do: Repo.get!(User, id)

  @spec create_user(map) :: db_res
  def create_user(attrs \\ %{}) do
    %User{}
    |> User.changeset(attrs)
    |> Repo.insert()
  end

  @spec update_user(User.t(), map) :: db_res
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @spec delete_user(User.t()) :: db_res
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @spec change_user(User.t()) :: %Ecto.Changeset{}
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end
end
