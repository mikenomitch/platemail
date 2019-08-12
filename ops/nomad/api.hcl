job "api" {
  datacenters = ["us-east-1"]
  type = "service"

  group "application" {
    count = 2

    task "server" {
      driver = "docker"

      config {
        image = "mnomitch/platemail_api"
        network_mode = "bridge"

        port_map = {
          http = 4000
          https = 4000
        }
      }

      template {
        destination = "secrets/file.env"
        env         = true
        splay       = "5m"
        data = <<EOH
API_DSN="{{key "platemail_api/API_DSN"}}"
DATABASE_URL="{{key "platemail_api/DATABASE_URL"}}"
PORT="4000"
SECRET_KEY_BASE="{{key "platemail_api/SECRET_KEY_BASE"}}"
MIX_ENV="{{key "platemail_api/MIX_ENV"}}"
EOH
      }

      service {
        name = "platemail-api"
        tags = [
          "urlprefix-/api",
          "urlprefix-/auth",
          "urlprefix-/docs",
          "urlprefix-/socket"
        ]
        port = "https"

        check {
          type = "http"
          path = "/health"
          interval = "10s"
          timeout = "2s"
        }
      }

      resources {
        cpu = 256
        memory = 256

        network {
          mbits = 2
          port "http" {}
          port "https" {}
        }
      }
    }
  }
}
