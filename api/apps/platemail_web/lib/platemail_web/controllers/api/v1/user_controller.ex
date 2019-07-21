defmodule PlatemailWeb.Api.V1.UserController do
  use PlatemailWeb, :controller

  alias Platemail.Accounts
  alias Platemail.Accounts.{Authentication, User}

  action_fallback(PlatemailWeb.Api.V1.FallbackController)

  @type conn_t :: Plug.Conn.t()

  @spec index(conn_t, any) :: conn_t
  def index(conn, _params) do
    users = Accounts.list_users()
    render(conn, "index.json", users: users)
  end

  @spec create(conn_t, map) :: {:error, Ecto.Changeset.t()} | conn_t
  def create(conn, %{"user" => user_params}) do
    with {:ok, %User{} = user} <- Accounts.create_user(user_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", user_path(conn, :show, user))
      |> render("show.json", user: user)
    end
  end

  @spec show(conn_t, map) :: {:error, :not_found} | conn_t
  def show(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)
    render(conn, "show.json", user: user)
  end

  @spec update(conn_t, map) :: {:error, :not_found} | {:error, Ecto.Changeset.t()} | conn_t
  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Accounts.get_user!(id)

    with {:ok, user = %User{}} <- Accounts.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  @spec delete(conn_t, map) ::
          {:error, :not_found | Ecto.Changeset.t()} | conn_t
  def delete(conn, %{"id" => id}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{}} <- Accounts.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end

  @spec info(conn_t, map) :: {:error, :unauthorized} | conn_t
  def info(conn, _params) do
    with user = %User{} <- Authentication.Plug.current_resource(conn) do
      render(conn, "show.json", user: user)
    else
      _ -> {:error, :unauthorized}
    end
  end
end
