use Mix.Config

# General application configuration
config :platemail,
  ecto_repos: [Platemail.Repo]

config :platemail, Platemail.Accounts.Authentication,
  issuer: "platemail",
  # TODO: use `mix guardian.gen.secret` to make new one and set to env vars
  secret_key: "rjJkwUP1ADt7sWEivlVkk+y3P3dWXuS0cC5J6MP/wAvHuEvSuJyOHA9yGyGypQ9q"

config :ueberauth, Ueberauth,
  providers: [
    identity: {Ueberauth.Strategy.Identity, [callback_methods: ["POST"]]}
  ]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
