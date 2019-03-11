# Platemail

Platemail is meant to provide a base boilerplate for quickly building out webapps.

### Backend:

- Elixir (1.8)
- Erlang/OTP (21)
- Phoenix (1.4)
- Postgres

### Frontend:

- Typescript (3)
- Webpack (4)
- Preact
- Redux

### Ops:

- Terraform
- Nomad
- Docker

## Goals

The goal of the app/repo is to lay a foundation for quick iteration on future project & toy apps.

Backend features:

- An example resource with schema/model/controller/view/routing
- A barebones user model with sign up/in/out
  - Including tokens for password reset
- Basic auth via JWTs
- Swagger API docs
- Auth credential confirmation/password resets/magic login
- Event broadcasting via Channels (TODO)
- TSL/HTTPS support (TODO)
- A few simple example tests (TODO)

Frontend features:

- JS bundles with common chunks, code-splitting, & cache-busting
- Minimal css/style "framework"
  - Postcss Modules
  - SASS compilation
  - Basic variables, helper functions, and mixins
  - Normalized CSS
- Frontend routing
- Fetching with auth and call status tracking
- Gzipped and minified production build
- Redux-based data layer with DRY base reducer
- Socket connection to the backend's phoenix channels
- A few simple example tests (TODO)

Development features:

- Single command to launch app locally
- Hot loading & reloading of JS and CSS
- Backend auto-reloading
- Prettier/ESLint auto-formatting
- Elixir auto-formatting
- CSS Linting
- Shared VSCode Rules

Devops featues:

- Infrastructure in Code
- Single command deploys (TODO)
- Error Alerting (TODO)
- Logging (TODO)

## Setting Up

Local Dev Dependencies:

- psql
- elixir
- erlang
- node/npm
- webpack

`mix deps.get`
`mix ecto.create`
`mix ecto.migrate`
`cd ./frontend && npm install`

## Running Locally

Set ENV vars
`export PORT=4000 HOST=localhost DB_USER=postgres DB_PASSWORD=postgres DB_NAME=platemail_dev DB_HOST=localhost REPLACE_OS_VARS=true`

Start the backend:
`iex -S mix phx.server`

Start the frontend:
`cd priv/app && npm run start`

Or run the local startup script:
`./scripts/run.sh`

## Deploying

Deployment Dependencies:

- docker
- terraform
- nomad

## Testing

Information Coming Soon
