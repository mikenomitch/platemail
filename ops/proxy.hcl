job "proxy" {
  datacenters = ["dc1"]
  type = "system"

  group "fabio" {
    count = 1

    task "fabio" {
      driver = "raw_exec"

      // see https://github.com/fabiolb/fabio/releases for links
      artifact {
        source = "https://github.com/fabiolb/fabio/releases/download/v1.5.11/fabio-1.5.11-go1.11.5-darwin_amd64"
      }

      config {
        command = "fabio-1.5.11-go1.11.5-darwin_amd64"
      }

      resources {
        cpu = 256
        memory = 256

        network {
          mbits = 20
          port "lb" {
            static = 9999
          }
          port "fabio_ui" {
            static = 9998
          }
        }
      }
    }
  }
}
