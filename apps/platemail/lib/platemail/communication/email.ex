defmodule Platemail.Email do
  import Bamboo.Email

  def welcome_email do
    base_email()
    |> to("mikenomitch@gmail.com")
    |> subject("Test Email")
    |> html_body("<strong>Welcome</strong>")
    |> text_body("welcome")
  end

  def base_email do
    new_email()
    |> from("notifications@relayd.io")
  end
end
