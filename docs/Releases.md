# Notes to self on releases

`MIX_ENV=prod mix compile`
`MIX_ENV=prod mix phx.digest`
`MIX_ENV=prod mix release --env=prod`
`REPLACE_OS_VARS=true _build/prod/rel/platemail/bin/platemail foreground`

# Command to run it via docker

Build if necessary:
`docker build -t platemail .`

`docker run --env HOST=localhost --env PORT=4000 --env DB_USER=postgres --env DB_PASSWORD=postgres --env DB_NAME=platemail_dev --env DB_HOST=host.docker.internal --env SECRET_KEY_BASE=9bhPzyt2a7QLFKecq0o8YTlKtpMk77Q4Sg1FxOZzGCao/+HZ4Eos637DGK0M4m2K --env REPLACE_OS_VARS=true -it -p 4000:4000 --rm platemail:latest foreground`

# Command to run it via minikube

`minikube start --cpus 4 --memory 8192`
`eval $(minikube docker-env)`
docker run (...etc...)
`minikibe service platemail-service`

# Command to deploy to gcp

# Command to deploy to aws
