# Platemail

This is a boilerplate app running the following:

### Backend:

- Elixir (1.7)
- Erlang/OTP (21)
- Phoenix (1.3)
- Postgres

### Frontend:

- Typescript (3)
- Webpack (4)
- Preact
- Redux

## Goals

The goal of the app/repo is to lay a foundation for quick iteration on future project & toy apps.

The backend should have:

- An example resource with schema/model/controller/view/routing - (done)
- API routes and Browser Routes - (done)
- A barebones user model with sign up/in/out
  - Including tokens for password reset
- Basic auth on both API and browser with JWTS
- Auth credential confirmation/password resets/magic login
- Swagger docs
- Event broadcasting via Channels
- Optional replica DB support
- TSL/HTTPS support
- A few simple example tests
- Pagination - (done)

The frontend should have:

- small split-out bundles with common chunks - (done)
- postcss compilation - (done)
- sane css variables and minimal "framework" - (done)
- a nice font - (done)
- a simple frontend router - (done)
- a simple fetching lib - (done)
- gzipped and minified production build - (done)
- code-splitting - (done)
- cache-busting - (done)
- editor debugging - (done)
- sane data layer (redux & custom code) - (done)
- normalized css - (some plugin)
- memoized re-rendering (reselect)
- socket connection to phoenix channel
- A few simple example tests

The dev experience should entail:

- a single command to run the app
- frontend reloading for JS & css - (done)
- backend auto reloading - (done)
- prettier/eslint rules - (done)
- auto-formatting elixir - (done)
- css-linting - (done)
- shared vscode rules - (done)

The deploy/ops experience:

- single command
- multi-server w load-balancer
- frontend served via CDN
- error alerting
- logging
- k8s deploy (in code)

## Setting Up

Dependencies:

- psql
- elixir
- erlang
- node/npm
- webpack

`mix deps.get`
`mix ecto.create`
`mix ecto.migrate`
`cd apps/platemail_web/lib/platemail_web/app && npm install`

## Running Locally

Start the backend:
`iex -S mix phx.server`

Start the frontend:
`cd priv/app && npm run start`

## Deploying

Information Coming Soon

## Testing

Information Coming Soon
