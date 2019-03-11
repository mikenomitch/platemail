echo === SETTING ENV VARS ===
export DB_HOST=localhost
export DB_NAME=platemail_prod
export DB_PASSWORD=postgres
export DB_USER=postgres
export HOST=localhost
export MIX_ENV=prod
export PORT=4000
export REPLACE_OS_VARS=true

echo === COMPILING ===
mix compile
mix phx.digest

echo === BUILDING RELEASE ===
mix release --env=prod

echo === RUNNING RELEASE ===
_build/prod/rel/platemail/bin/platemail foreground
