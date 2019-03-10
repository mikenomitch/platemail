echo === BUILD LOCALLY ===
docker build -t platemail .

echo === RUN LOCALLY ===
docker run --env HOST=localhost \
  --env PORT=4000 \
  --env DB_USER=postgres \
  --env DB_PASSWORD=postgres \
  --env DB_NAME=platemail_dev \
  --env DB_HOST=host.docker.internal \
  --env SECRET_KEY_BASE=9bhPzyt2a7QLFKecq0o8YTlKtpMk77Q4Sg1FxOZzGCao/+HZ4Eos637DGK0M4m2K \
  --env REPLACE_OS_VARS=true \
  -it -p 4000:4000 --rm platemail:latest foreground
