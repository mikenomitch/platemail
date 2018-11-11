# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :platemail_web,
  namespace: PlatemailWeb,
  ecto_repos: [Platemail.Repo]

# Configures the endpoint
config :platemail_web, PlatemailWeb.Endpoint,
  url: [host: {:system, "HOST"}],
  # TODO: use `mix guardian.gen.secret` to make new one and set to env vars
  secret_key_base: "${SECRET_KEY_BASE}",
  render_errors: [view: PlatemailWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: PlatemailWeb.PubSub, adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

config :platemail_web, :generators, context_app: :platemail

config :platemail_web, :phoenix_swagger,
  swagger_files: %{
    "priv/static/swagger.json" => [
      router: PlatemailWeb.Router
    ]
  }

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
