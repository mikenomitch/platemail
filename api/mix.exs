defmodule Platemail.Umbrella.Mixfile do
  use Mix.Project

  def project do
    [
      apps_path: "apps",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
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
    []
  end
end
