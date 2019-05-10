defmodule Platemail.Repo do
  use Ecto.Repo,
    otp_app: :platemail,
    adapter: Ecto.Adapters.Postgres

  use Scrivener, page_size: 20

  @doc """
  Dynamically loads the repository url from the
  DATABASE_URL environment variable.

  NOTE: I dont think this is needed
  """
  # def init(_, opts) do
  #   {:ok, Keyword.put(opts, :url, System.get_env("DATABASE_URL"))}
  # end
end
