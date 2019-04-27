job "proxy" {
  datacenters = ["dc1"]
  type = "system"
  update {
    stagger = "5s"
    max_parallel = 1
  }

  group "haproxy" {
    count = 1
    task "haproxy" {
      driver = "docker"
      config {
        image = "haproxy/haproxy:1.9.7-alpine"
        command = "/usr/local/bin/envoy"
        args = [
            "--concurrency 4",
            "--config-path /etc/envoy.json",
            "--mode serve",
        ]
        volumes = ["new/envoy.json:/etc/envoy.json" ]
        network_mode = "host"
      }
      artifact {
        source = "https://gist.githubusercontent.com/anubhavmishra/afe699320bdc4d855d13e7cc244822e0/raw/5891bdb7b0ad1dc633c771c8c8e892cafc8a9978/envoy.json"
      }
      template {
        source        = "local/envoy.json"
        destination   = "new/envoy.json"
        change_mode   = "restart"
      }
      resources {
        network {
          mbits = 10
          port "envoy" {
            static = 1010
          }1
        }
      }
    }
  }
}