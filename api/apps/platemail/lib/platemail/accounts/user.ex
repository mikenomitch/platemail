defmodule Platemail.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias Platemail.Accounts.{Credential, User}

  schema "users" do
    field(:email, :string)
    field(:name, :string)
    has_many(:credentials, Credential)

    timestamps()
  end

  @spec changeset(User.t(), map) :: Ecto.Changeset.t()
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end

  @spec registration_changeset(User.t(), map) :: Ecto.Changeset.t()
  def registration_changeset(user, attrs) do
    user
    |> cast(attrs, [:email, :name])
    |> validate_required([:email, :name])
  end

  @spec validate_email(binary) :: true
  def validate_email(_email) do
    true
  end
end
