// service {
//   name = "api"
//   tags = ["phoenix"]
//   port = 3000
//   check {
//     id = "api",
//     name = "HTTP API on port 3000",
//     http = "http://localhost:3000/health",
//     tls_skip_verify = true,
//     method = "GET",
//     interval = "10s",
//     timeout = "1s"
//   }
//   // connect {
//   //   sidecar_service {}
//   // }
// }
