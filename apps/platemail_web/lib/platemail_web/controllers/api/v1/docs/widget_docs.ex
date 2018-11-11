defmodule PlatemailWeb.Api.V1.WidgetDocs do
  use PhoenixSwagger

  defmacro __using__(_) do
    quote do
      swagger_path :show do
        get("/api/v1/widgets/{id}")
        produces("application/json")

        description("""
        The show page for a widget.
        """)

        response(200, "OK", Schema.ref(:Widget))
      end
    end
  end
end
