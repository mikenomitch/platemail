use Mix.Config

# Configure your database
config :platemail, Platemail.Repo,
  database: "platemail_dev",
  username: "postgres",
  password: "postgres",
  hostname: "localhost",
  pool_size: 10
