defmodule PlatemailWeb.Mixfile do
  use Mix.Project

  def project do
    [
      app: :platemail_web,
      version: "0.0.1",
      build_path: "../../_build",
      config_path: "../../config/config.exs",
      deps_path: "../../deps",
      lockfile: "../../mix.lock",
      elixir: "~> 1.9",
      elixirc_paths: elixirc_paths(Mix.env()),
      compilers: [:phoenix, :gettext, :phoenix_swagger] ++ Mix.compilers(),
      start_permanent: Mix.env() == :prod,
      aliases: aliases(),
      deps: deps()
    ]
  end

  def application do
    [
      mod: {PlatemailWeb.Application, []},
      extra_applications: [:logger, :runtime_tools, :scrivener_ecto]
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]

  defp deps do
    [
      {:phoenix, "~> 1.4.9", override: true},
      {:phoenix_pubsub, "~> 1.1.2"},
      {:ecto_sql, "~> 3.1.6"},
      {:phoenix_ecto, "~> 4.0"},
      {:phoenix_html, "~> 2.13"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:gettext, "~> 0.17"},
      {:platemail, in_umbrella: true},
      {:plug_cowboy, "~> 2.1.0"},
      {:plug, "~> 1.8.2"},
      {:jason, "~> 1.1"},
      {:scrivener_ecto, "~> 2.0"},
      {:phoenix_swagger, "~> 0.8"},
      {:ex_json_schema, "~> 0.5"}
    ]
  end

  defp aliases do
    [test: ["ecto.create --quiet", "ecto.migrate", "test"]]
  end
end
