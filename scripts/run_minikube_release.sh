minikube start
`eval $(minikube docker-env)`
docker run (...etc...)
minikube service platemail-service

echo === START MINIKUBE ===
minikube start --cpus 4 --memory 8192

echo === EXECUTE DOCKER VIA MIKIKUBE ===
eval $(minikube docker-env)

echo === RUN APP ===
docker run --env HOST=localhost \
  --env PORT=4000 \
  --env DB_USER=postgres \
  --env DB_PASSWORD=postgres \
  --env DB_NAME=platemail_dev \
  --env DB_HOST=host.docker.internal \
  --env SECRET_KEY_BASE=9bhPzyt2a7QLFKecq0o8YTlKtpMk77Q4Sg1FxOZzGCao/+HZ4Eos637DGK0M4m2K \
  --env REPLACE_OS_VARS=true \
  -it -p 4000:4000 --rm platemail:latest foreground

echo === OPEN APP ===
minikube service platemail-service