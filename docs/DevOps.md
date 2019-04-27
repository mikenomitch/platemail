# DevOps ToDos:

- Maybe use Fabio instead of HAProxy!! (https://www.nomadproject.io/guides/load-balancing/fabio.html)
- Get frontend "production" build running on node alone
  - Get this running in a lone docker container
  - Get this container running as a nomad job
- Get backend running as a Nomad job with Docker
- Locally can run all containers/have single IP to use app
- Locally can swap out K/Vs well
- Get Terraform working with nomad/consul/etc
- Get it up on AWS with RDS

* To explore once this is done:
  - Backend running without Docker (for hot upgrades)
  - Server-Side rendering with Node
    If you cant use Fabio for some reason...

- Get HAProxy running and routing requests to different places
  - Locally running on docker
  - Routing /api to one socat and /\*anything_else to another socat
  - Get this running as a nomad job
