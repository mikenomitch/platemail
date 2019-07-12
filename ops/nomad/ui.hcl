job "frontend" {
  datacenters = ["us-east-1"]
  type = "service"

  group "application" {
    count = 2

    task "server" {
      driver = "docker"

      config {
        image = "mnomitch/platemail_frontend"
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
FOO="{{key "platemail_ui/FOO"}}"
PORT="{{key "platemail_ui/PORT"}}"
API_PORT="{{key "platemail_ui/API_PORT"}}"
API_HOST="{{key "platemail_ui/API_HOST"}}"
NODE_ENV="{{key "platemail_ui/NODE_ENV"}}"
REACT_APP="{{key "platemail_ui/REACT_APP"}}"
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

      kill_timeout = "10m"

      env {
        HTTPS = true
      }
    }
  }
}
