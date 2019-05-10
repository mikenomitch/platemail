provider "aws" {
  region  = "us-east-1"
}

module "nomad" {
  source  = "mikenomitch/terraform-aws-hashistack"
  // version = "0.4.5"

  // ami_id = "ami-0812b69a5cc3d58f3"
  // instance_type = "t2.micro"
  // num_clients = "1"
  // num_servers = "1"
  // cluster_name = "personal_cluster"
  // ssh_key_name = "nomad"
}
