defmodule PlatemailWeb.Api.V1.Docs do
  use PhoenixSwagger

  def setup do
    quote do
      def swagger_definitions do
        %{
          Widget:
            swagger_schema do
              title("Widget")
              description("A widget is similar to a sprocket.")

              properties do
                content(:string, "Content of the widget.", example: "Widget 14-A")
                title(:string, "Name of the widget", example: "Widget 23-B")
              end
            end
        }
      end
    end
  end

  defmacro __using__(which) when is_atom(which) do
    apply(__MODULE__, which, [])
  end
end
