defmodule PlatemailWeb.Router do
  use PlatemailWeb, :router

  # =============
  #   PIPELINES
  # =============

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

  pipeline :authenticated_api do
    plug(:accepts, ["json"])
    plug(Guardian.Plug.VerifySession, claims: %{"typ" => "access"})
    plug(Guardian.Plug.VerifyHeader, claims: %{"typ" => "access"})
    plug(Guardian.Plug.EnsureAuthenticated)
    plug(Guardian.Plug.LoadResource)
  end

  # ==============
  #   API ROUTES
  # ==============

  # == NO AUTH ==

  # Other scopes may use custom stacks.
  scope "/api/v1", PlatemailWeb.Api.V1 do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit, :create])
    resources("/widgets", WidgetController, except: [:new, :edit, :create])
  end

  # == WITH AUTH ==

  scope "/api/v1", PlatemailWeb.Api.V1 do
    pipe_through(:api)
    resources("/users", UserController, only: [:create])
    resources("/widgets", WidgetController, only: [:create])
  end

  # ==================
  #   BROWSER ROUTES
  # ==================

  scope "/auth", PlatemailWeb.Api.V1 do
    pipe_through(:browser)

    get("/:provider", AuthController, :request)
    get("/:provider/callback", AuthController, :callback)
  end

  scope "/auth", PlatemailWeb.Api.V1 do
    pipe_through(:api)
    post("/identity/callback", AuthController, :callback)
  end

  scope "/", PlatemailWeb do
    # Use the default browser stack
    pipe_through(:browser)
  end
end
