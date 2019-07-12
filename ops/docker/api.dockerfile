# Dockerfile
FROM elixir:1.9.0-alpine

# install build dependencies
RUN apk add --update git bash libssl1.1 openssl

# prepare build dir
RUN mkdir /app
WORKDIR /app

# install hex + rebar
RUN mix local.hex --force && mix local.rebar --force

# install mix dependencies
COPY mix.exs mix.lock config ./
RUN mix deps.get --only prod

COPY ./ ./
EXPOSE 4000

CMD ["mix", "phx.server"]