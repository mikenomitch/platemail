provider "aws" {
  region  = "us-east-1"
}

module "nomad" {
  source  = "hashicorp/nomad/aws"
  version = "0.4.5"

  instance_type = "t2.micro"
  num_clients = "1"
  num_servers = "1"
  cluster_name = "personal_cluster"
  ssh_key_name = "id_rsa"
}
