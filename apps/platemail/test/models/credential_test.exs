defmodule Platemail.CredentialTest do
  use Platemail.ModelCase

  alias Platemail.Credential

  @valid_attrs %{expires_at: 42, password: "some password", password_confirmation: "some password_confirmation", provider: "some provider", refresh_token: "some refresh_token", token: "some token", uid: "some uid"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Credential.changeset(%Credential{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Credential.changeset(%Credential{}, @invalid_attrs)
    refute changeset.valid?
  end
end
