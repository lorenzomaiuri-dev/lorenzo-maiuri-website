# Custom domain binding: routes lorenzomaiuri.dev → the lorenzo-maiuri-website Worker.
#
# IMPORT (run once if the binding already exists in the dashboard):
#   terraform import cloudflare_worker_domain.lorenzomaiuri <account_id>/lorenzomaiuri.dev
#
# After import, `terraform plan` must show "No changes."
resource "cloudflare_worker_domain" "lorenzomaiuri" {
  account_id = var.cloudflare_account_id
  hostname   = "lorenzomaiuri.dev"
  service    = "lorenzo-maiuri-website"
  zone_id    = var.cloudflare_zone_id
}
