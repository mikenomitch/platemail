job "ui" {
  datacenters = ["us-east-1"]
  type = "service"

  group "application" {
    count = 2

    task "server" {
      driver = "docker"

      config {
        image = "mnomitch/platemail_ui"
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
API_HOST="{{key "platemail_ui/API_HOST"}}"
HOST="{{key "platemail_ui/HOST"}}"
API_PORT="{{key "platemail_ui/API_PORT"}}"
NODE_ENV="{{key "platemail_ui/NODE_ENV"}}"
PORT="{{key "platemail_ui/PORT"}}"
REACT_APP="{{key "platemail_ui/REACT_APP"}}"
UI_DSN="{{key "platemail_ui/UI_DSN"}}"
EOH
      }

      service {
        name = "platemail-frontend"
        tags = ["urlprefix-/"]
        port = "https"

        check {
          type = "http"
          path = "/"
          interval = "10s"
          timeout = "2s"

          check_restart {
            limit = 60
            grace = "10s"
          }
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

      kill_timeout = "5m"

      env {
        HTTPS = true
      }
    }
  }
}
