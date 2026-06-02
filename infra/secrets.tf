# Worker secrets — encrypted at rest, never appear in Cloudflare dashboard as plaintext.
#
# BACKEND_API_KEY is sensitive; managed here.
# BACKEND_API_URL is not sensitive; it lives in wrangler.jsonc vars so it is visible
# in the repository and is set at deploy time by Wrangler.
#
# Secret values are passed via TF_VAR_* environment variables in CI (see README.md).
# They are marked sensitive in Terraform so they are redacted from plan/apply output
# and never written to the state file in plaintext.

resource "cloudflare_worker_secret" "backend_api_key" {
  account_id  = var.cloudflare_account_id
  name        = "BACKEND_API_KEY"
  script_name = "lorenzo-maiuri-website"
  secret_text = var.backend_api_key
}
