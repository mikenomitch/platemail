consul agent -dev -node machine -config-dir=./ops/consul.d
sudo nomad agent -dev -config ./ops/consul.hcl
nomad job run ./ops/nomad/proxy.hcl
nomad job run ./ops/nomad/api.hcl
nomad job run ./ops/nomad/ui.hcl
