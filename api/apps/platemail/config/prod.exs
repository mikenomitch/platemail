use Mix.Config

config :platemail, Platemail.Repo,
  url: System.get_env("DATABASE_URL"),
  pool_size: 10,
  ssl: false
