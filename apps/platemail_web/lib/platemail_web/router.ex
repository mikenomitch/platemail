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
    plug(PlatemailWeb.Authentication.ApiAuthPipeline)
  end

  # ==============
  #   API ROUTES
  # ==============

  # == NO AUTH ==

  # Other scopes may use custom stacks.
  scope "/api/v1", PlatemailWeb.Api.V1 do
    pipe_through(:api)
    resources("/users", UserController, except: [:new, :edit, :create])

    post("/auth/password_reset_request", AuthController, :password_reset_request)
    post("/auth/magic_login_request", AuthController, :magic_login_request)
  end

  # == WITH AUTH ==

  scope "/api/v1", PlatemailWeb.Api.V1 do
    pipe_through(:authenticated_api)
    resources("/users", UserController, only: [:create])
    resources("/widgets", WidgetController)
  end

  # ================
  #   SWAGGER DOCS
  # ================

  scope "/docs" do
    forward(
      "/",
      PhoenixSwagger.Plug.SwaggerUI,
      otp_app: :platemail_web,
      swagger_file: "swagger.json"
    )
  end

  def swagger_info do
    %{
      info: %{
        version: "1.0",
        title: "Platemail"
      }
    }
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

    get("/confirm_email/:token", PageController, :confirm_email)
    get("/magic_login/:token", PageController, :magic_login)
    get("/password_reset/:token", PageController, :password_reset)

    # Serve the frontend app
    get("/*anything", PageController, :index)
  end
end
