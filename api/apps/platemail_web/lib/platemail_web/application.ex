defmodule PlatemailWeb.Application do
  use Application

  @spec start(any, any) :: {:error, any} | {:ok, pid}
  def start(_type, _args) do
    import Supervisor.Spec

    children = [
      supervisor(PlatemailWeb.Endpoint, []),
      supervisor(Task.Supervisor, [[name: Sentry.TaskSupervisor]])
    ]

    opts = [strategy: :one_for_one, name: PlatemailWeb.Supervisor]

    {:ok, _} = Logger.add_backend(Sentry.LoggerBackend)

    Supervisor.start_link(children, opts)
  end

  def config_change(changed, _new, removed) do
    PlatemailWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
