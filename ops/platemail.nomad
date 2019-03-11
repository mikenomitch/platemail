job "platemail" {
  datacenters = ["dc1"]

  type = "service"

  update {
    max_parallel = 1
    min_healthy_time = "10s"
    healthy_deadline = "3m"
    progress_deadline = "10m"
    auto_revert = false
    canary = 0
  }

  migrate {
    max_parallel = 1
    health_check = "checks"
    min_healthy_time = "10s"
    healthy_deadline = "5m"
  }

  group "application" {
    count = 1

    restart {
      attempts = 2
      interval = "30m"
      delay = "15s"
      mode = "fail"
    }

    ephemeral_disk {
      size = 300
    }

    task "webservice" {
      driver = "docker"

      config {
        image = "mnomitch/platemail"
        args = [
          "-text", "'hello world'",
          "-listen", ":4000",
        ]

        port_map {
          http = 4000
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