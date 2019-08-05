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
      {:ecto_sql, "~> 3.1.6"},
      {:ex_json_schema, "~> 0.6"},
      {:gettext, "~> 0.17"},
      {:jason, "~> 1.1"},
      {:phoenix_ecto, "~> 4.0"},
      {:phoenix_html, "~> 2.13"},
      {:phoenix_live_reload, "~> 1.2", only: :dev},
      {:phoenix_pubsub, "~> 1.1.2"},
      {:phoenix_swagger, "~> 0.8"},
      {:phoenix, "~> 1.4.9", override: true},
      {:platemail, in_umbrella: true},
      {:plug_cowboy, "~> 2.1.0"},
      {:plug, "~> 1.8.2"},
      {:scrivener_ecto, "~> 2.2"}
    ]
  end

  defp aliases do
    [
      test: ["ecto.create --quiet", "ecto.migrate", "test"],
      sentry_recompile: ["compile", "deps.compile sentry --force"]
    ]
  end
end
