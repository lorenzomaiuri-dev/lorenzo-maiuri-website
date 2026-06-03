# Worker secrets cannot be managed via Terraform in Cloudflare provider v5.
# BACKEND_API_KEY is set at deploy time via `wrangler secret put` in the CI/CD pipeline.
# See .github/workflows/deploy-production.yml and deploy-preview.yml.
