use Mix.Config

# Configure your database
config :platemail, Platemail.Repo,
  database: "platemail_dev",
  username: System.get_env("DB_USER") || "postgres",
  password: System.get_env("DB_PASSWORD") || "postgres",
  hostname: System.get_env("DB_HOST") || "localhost",
  pool_size: 10
