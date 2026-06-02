terraform {
  backend "gcs" {
    # Shared state bucket with the backend service — different prefix per project.
    # Create/verify the bucket exists before first `terraform init`:
    #   gsutil ls gs://lorenzobot-tf-state  (already exists — created by chatbot infra)
    bucket = "lorenzobot-tf-state"
    prefix = "frontend"
  }
}
