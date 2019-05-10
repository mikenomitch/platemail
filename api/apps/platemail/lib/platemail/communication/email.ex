defmodule Platemail.Email do
  import Bamboo.Email
  alias Platemail.Mailer

  def send_login_link(email_address, token) do
    login_link = "localhost:4000/magic_login/#{token}"

    email_address
    |> base_email()
    |> subject("Platemail: Login")
    |> html_body("<p><a href=\"#{login_link}\">Go to Platemail</a></p>")
    |> text_body("login to platemail")
    |> Mailer.deliver_later()
  end

  def send_password_reset(email_address, token) do
    pw_reset_link = "localhost:3000/password_reset/#{token}"

    email_address
    |> base_email()
    |> subject("Platemail: Password Reset")
    |> html_body("<p><a href=\"#{pw_reset_link}\">Reset Platemail Password</a></p>")
    |> text_body("password reset")
    |> Mailer.deliver_later()
  end

  def send_welcome_email(email_address) do
    email_address
    |> base_email()
    |> subject("Platemail: Test Email")
    |> html_body("<p>Welcome to Platemail</p>")
    |> text_body("welcome")
    |> Mailer.deliver_later()
  end

  defp base_email(email_address) do
    new_email()
    |> to(System.get_env("EMAIL_OVERRIDE") || email_address)
    |> from("notifications@relayd.io")
  end
end
