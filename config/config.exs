# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :platemail,
  ecto_repos: [Platemail.Repo]

# Configures the endpoint
config :platemail, PlatemailWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "bB7ayVtyj54iv0y8+u3+lH7/sFr2y2sN00704C4Z1qEPX0CWpLjDpdb3JpxrNWd7",
  render_errors: [view: PlatemailWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Platemail.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:user_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
