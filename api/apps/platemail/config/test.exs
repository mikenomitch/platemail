use Mix.Config

config :platemail, Platemail.Repo,
  username: "postgres",
  password: "postgres",
  database: "platemail_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox

# Use same passwords in tests
config :pbkdf2_elixir, rounds: 1
