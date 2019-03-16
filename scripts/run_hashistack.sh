sudo nomad agent -dev -config ./ops/server.hcl
consul agent -dev -node machine
nomad job run ./ops/platemail.hcl
