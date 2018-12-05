defmodule Platemail.Accounts.UserQueries do
  @moduledoc """
  Queries the db for user-related data.

  'get_' implies actually making a call
  otherwise it is likely building a query
  """

  import Ecto.Query

  alias Platemail.{
    Accounts.User,
    Repo
  }

  @type ecto_query :: Ecto.Query.t()

  @spec get_by_email(binary) :: User.t()
  def get_by_email(email) do
    by_email(email) |> Repo.one()
  end

  @spec by_email(ecto_query, binary) :: ecto_query
  def by_email(query \\ User, email) do
    query |> where(email: ^email)
  end
end
