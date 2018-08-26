defmodule PlatemailWeb.Router do
  use PlatemailWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", PlatemailWeb do
    # Use the default browser stack
    pipe_through(:browser)
  end

  # Other scopes may use custom stacks.
  scope "/api", PlatemailWeb do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit])
  end
end
