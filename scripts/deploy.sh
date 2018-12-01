echo === SUBMIT BUILD TO REGISTRY ===
gcloud builds submit --tag=gcr.io/${PROJECT_ID}/platemail:release .

echo === APPLY LATEST CHANGES ===
kubectl apply -f k8s/platemail-deployment.yaml
