echo === BUILD API IMAGE ===
docker build -t mnomitch/platemail_api  -f ./ops/docker/api.dockerfile ./api

echo === PUSH API TO DOCKERHUB ===
docker push mnomitch/platemail_api
