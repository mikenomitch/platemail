defmodule PlatemailWeb.WidgetControllerTest do
  use PlatemailWeb.ConnCase

  alias Platemail.Platemail
  alias Platemail.Platemail.Widget

  @create_attrs %{content: "some content", title: "some title"}
  @update_attrs %{content: "some updated content", title: "some updated title"}
  @invalid_attrs %{content: nil, title: nil}

  def fixture(:widget) do
    {:ok, widget} = Platemail.create_widget(@create_attrs)
    widget
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all widgets", %{conn: conn} do
      conn = get conn, widget_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create widget" do
    test "renders widget when data is valid", %{conn: conn} do
      conn = post conn, widget_path(conn, :create), widget: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, widget_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "content" => "some content",
        "title" => "some title"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, widget_path(conn, :create), widget: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update widget" do
    setup [:create_widget]

    test "renders widget when data is valid", %{conn: conn, widget: %Widget{id: id} = widget} do
      conn = put conn, widget_path(conn, :update, widget), widget: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, widget_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "content" => "some updated content",
        "title" => "some updated title"}
    end

    test "renders errors when data is invalid", %{conn: conn, widget: widget} do
      conn = put conn, widget_path(conn, :update, widget), widget: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete widget" do
    setup [:create_widget]

    test "deletes chosen widget", %{conn: conn, widget: widget} do
      conn = delete conn, widget_path(conn, :delete, widget)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, widget_path(conn, :show, widget)
      end
    end
  end

  defp create_widget(_) do
    widget = fixture(:widget)
    {:ok, widget: widget}
  end
end
