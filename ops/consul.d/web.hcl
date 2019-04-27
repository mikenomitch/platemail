service {
  name = "web"
  tags = ["node"]
  port = 4000
  check {
    id = "web",
    name = "HTTP GET on port 4000",
    http = "http://localhost:4000/health",
    tls_skip_verify = true,
    method = "GET",
    interval = "10s",
    timeout = "1s"
  }
  connect {
    sidecar_service {
      proxy {
        upstreams {
          destination_name = "api"
          local_bind_port = 3000
        }
      }
    }
  }
}
