job "platemail" {
  datacenters = ["dc1"]
  type = "service"

  group "application" {
    count = 2

    task "server" {
      // driver = "docker"

      config {
        image = "mnomitch/platemail"
        network_mode = "bridge"
        args = ["foreground"]

        port_map = {
          http = 4000
          https = 4000
        }
      }

//       template {
//         destination = "secrets/file.env"
//         env         = true
//         splay       = "5m"
//         data = <<EOH
// FOO="{{key "FOO"}}"
// EOH
//       }

      service {
        name = "platemail-web"
        tags = ["urlprefix-/", "platemail-web"]
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

      env {
        PORT = "4000"
        DB_USER = "postgres"
        DB_PASSWORD = "postgres"
        DB_NAME = "platemail_dev"
        DB_HOST = "host.docker.internal"
        SECRET_KEY_BASE = "9bhPzyt2a7QLFKecq0o8YTlKtpMk77Q4Sg1FxOZzGCao/+HZ4Eos637DGK0M4m2K"
        REPLACE_OS_VARS = true
      }
    }
  }
}
