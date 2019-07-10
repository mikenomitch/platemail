defmodule Platemail.Mixfile do
  use Mix.Project

  def project do
    [
      app: :platemail,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.9",
      elixirc_paths: elixirc_paths(Mix.env()),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  def application do
    [
      mod: {Platemail.Application, []},
      extra_applications: [
        :logger,
        :runtime_tools,
        :ueberauth,
        :ueberauth_identity,
        :comeonin,
        :scrivener_ecto,
        :bamboo
      ]
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  defp deps do
    [
      {:postgrex, ">= 0.0.0"},
      {:ecto, "~> 3.1.0"},
      {:ueberauth_identity, "~> 0.2"},
      {:ueberauth, "~> 0.4"},
      {:pbkdf2_elixir, "~> 0.12"},
      {:guardian, "~> 1.0"},
      {:comeonin, "~> 4.0"},
      {:cors_plug, "~> 1.5"},
      {:faker, "~> 0.12"},
      {:scrivener_ecto, "~> 2.0"},
      {:bamboo, "~> 1.2"}
    ]
  end

  defp aliases do
    [
      "ecto.setup": ["ecto.create", "ecto.migrate", "run priv/repo/seeds.exs"],
      "ecto.reset": ["ecto.drop", "ecto.setup"],
      test: ["ecto.create --quiet", "ecto.migrate", "test"]
    ]
  end
end
