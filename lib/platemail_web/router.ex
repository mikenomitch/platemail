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

  # Other scopes may use custom stacks.
  scope "/api/v1", PlatemailWeb.Api.V1 do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit])
    resources("/widgets", WidgetController, except: [:new, :edit])
  end

  scope "/", PlatemailWeb do
    # Use the default browser stack
    pipe_through(:browser)
  end
end
