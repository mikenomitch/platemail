defmodule Platemail.Repo.Migrations.CreateCredential do
  use Ecto.Migration

  def change do
    create table(:credentials) do
      add :provider, :string
      add :uid, :string
      add :token, :string
      add :refresh_token, :string
      add :expires_at, :integer
      add :password, :string
      add :password_confirmation, :string

      timestamps()
    end
  end
end
