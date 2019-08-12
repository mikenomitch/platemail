docker run --env HOST=localhost \
  --env FOO="BAZ" \
  --env PORT=4000 \
  --env DATABASE_URL=postgresql://postgres:postgres@host.docker.internal/platemail \
  --env SECRET_KEY_BASE=9bhPzyt2a7QLFKecq0o8YTlKtpMk77Q4Sg1FxOZzGCao/+HZ4Eos637DGK0M4m2K \
  -it -p 4000:4000 --rm platemail_api:latest start
