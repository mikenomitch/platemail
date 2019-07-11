consul agent -dev -node machine -config-dir=./ops/consul.d
sudo nomad agent -dev -config ./ops/server.hcl
nomad job run ./ops/nomad/proxy.hcl
nomad job run ./ops/nomad/backend.hcl
nomad job run ./ops/nomad/frontend.hcl
