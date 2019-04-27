consul agent -dev -node machine -config-dir=./ops/consul.d
sudo nomad agent -dev -config ./ops/server.hcl
nomad job run ./ops/proxy.hcl
nomad job run ./ops/backend.hcl
nomad job run ./ops/frontend.hcl
