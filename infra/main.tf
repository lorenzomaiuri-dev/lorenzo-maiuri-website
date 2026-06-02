# Data source for the lorenzomaiuri.dev zone.
# The zone is managed by Cloudflare as registrar + DNS — not created by Terraform.
# Import it if you want to manage DNS records: see README.md.
data "cloudflare_zone" "lorenzomaiuri" {
  zone_id = var.cloudflare_zone_id
}
