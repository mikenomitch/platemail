echo === STARTING APP: ===

echo === FRONTEND AT ${HOST}:${FRONTEND_PORT} ===
echo === BACKEND AT ${HOST}:${PORT} ===

cd frontend && npm run start & iex -S mix phx.server
