consul agent -dev -node machine -config-dir=./ops/consul.d
consul connect proxy -sidecar-for web
consul connect proxy -sidecar-for api
sudo nomad agent -dev -config ./ops/server.hcl
nomad job run ./ops/platemail.hcl
