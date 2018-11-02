defmodule Platemail.Application do
  @moduledoc """
  The Platemail Application Service.

  The platemail system business domain lives in this application.

  Exposes API to clients such as the `PlatemailWeb` application
  for use in channels, controllers, and elsewhere.
  """
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    Supervisor.start_link([
      supervisor(Platemail.Repo, []),
    ], strategy: :one_for_one, name: Platemail.Supervisor)
  end
end
