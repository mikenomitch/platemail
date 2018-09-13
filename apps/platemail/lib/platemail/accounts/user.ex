defmodule Platemail.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Platemail.Accounts.Credential

  schema "users" do
    field(:email, :string)
    field(:name, :string)

    has_many(:credentials, Credential)

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end

  @doc false
  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end

  @doc false
  def validate_email(_email) do
    true
  end
end
