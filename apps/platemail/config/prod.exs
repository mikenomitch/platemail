use Mix.Config

config :platemail, Platemail.Repo,
  adapter: Ecto.Adapters.Postgres,
  # username: {:system, "DB_USER"},
  # password: {:system, "DB_PASSWORD"},
  # database: {:system, "DB_NAME"},
  # hostname: {:system, "DB_HOST"},
  username: "postgres",
  password: "postgres",
  database: "platemail_dev",
  hostname: "localhost",
  pool_size: 10
