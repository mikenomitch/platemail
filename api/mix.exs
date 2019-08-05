defmodule Platemail.Umbrella.Mixfile do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      elixirc_options: [warnings_as_errors: true],
      dialyzer: [plt_add_deps: :apps_direct],
      aliases: aliases(),
      releases: [
        platemail: [
          version: "0.0.5",
          include_executables_for: [:unix],
          include_erts: true,
          applications: [
            platemail: :permanent,
            platemail_web: :permanent
          ]
        ]
      ]
    ]
  end

  defp deps do
    [
      {:dialyxir, "~> 1.0.0-rc.6", only: [:dev], runtime: false},
      {:sentry, "~> 7.0"},
      {:jason, "~> 1.1"}
    ]
  end

  defp aliases do
    [sentry_recompile: ["compile", "deps.compile sentry --force"]]
  end
end
