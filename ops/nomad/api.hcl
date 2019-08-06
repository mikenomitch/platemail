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
DB_HOST="{{key "platemail_api/DB_HOST"}}"
DB_NAME="{{key "platemail_api/DB_NAME"}}"
DB_PASSWORD="{{key "platemail_api/DB_PASSWORD"}}"
DB_USER="{{key "platemail_api/DB_USER"}}"
PORT="{{key "platemail_api/PORT"}}"
REPLACE_OS_VARS="{{key "platemail_api/REPLACE_OS_VARS"}}"
SECRET_KEY_BASE="{{key "platemail_api/SECRET_KEY_BASE"}}"
EOH
      }

      service {
        name = "platemail-api"
        tags = ["urlprefix-/api", "urlprefix-/docs"]
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
