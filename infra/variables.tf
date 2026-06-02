variable "cloudflare_api_token" {
  description = "Cloudflare API token scoped to Workers + DNS for lorenzomaiuri.dev. Set via TF_VAR_cloudflare_api_token."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID. Find it in the Cloudflare dashboard URL or under Account Home."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Zone ID for lorenzomaiuri.dev. Find it on the domain overview page in the Cloudflare dashboard."
  type        = string
}

variable "backend_api_key" {
  description = "Bearer token for the LorenzoBot backend API. Set via TF_VAR_backend_api_key. Stored as a Worker secret — never in state plaintext."
  type        = string
  sensitive   = true
}
