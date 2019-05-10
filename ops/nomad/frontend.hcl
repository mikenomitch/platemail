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
//         data = <<EOH
// FOO="{{key "FOO"}}"
// REACT_APP_FOO="{{key "REACT_APP_FOO"}}"
// EOH
//       }
        data = <<EOH
FOO="FOO"
REACT_APP_FOO="Bar"
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
        PORT = "4000"
        HTTPS = true
        REPLACE_OS_VARS = true
      }
    }
  }
}
