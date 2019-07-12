echo === BUILD IMAGE ===
docker build -t mnomitch/platemail_ui  -f ./ops/docker/ui.dockerfile ./ui

echo === PUSH TO DOCKERHUB ===
docker push mnomitch/platemail_ui
