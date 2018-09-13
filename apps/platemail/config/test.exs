use Mix.Config

# Configure your database
config :platemail, Platemail.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "platemail_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# Same passwords in tests
config :pbkdf2_elixir, rounds: 1
