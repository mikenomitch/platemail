echo === SETTING ENV VARS ===
export MIX_ENV=prod
export REPLACE_OS_VARS=true

echo === COMPILING ===
mix compile
mix phx.digest

echo === BUILDING RELEASE ===
mix release --env=prod

echo === RUNNING RELEASE ===
_build/prod/rel/platemail/bin/platemail foreground
