echo === STARTING APP: ===

echo === FRONTEND AT ${HOST}:${FRONTEND_PORT} ===
echo === BACKEND AT ${HOST}:${PORT} ===

cd ui && npm run start & cd api && iex -S mix phx.server
