use Mix.Config

# Configure your database
config :platemail, Platemail.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "platemail_dev",
  hostname: "localhost",
  pool_size: 10
