output "worker_hostname" {
  description = "Custom domain bound to the Worker."
  value       = cloudflare_worker_domain.lorenzomaiuri.hostname
}

output "zone_name" {
  description = "Cloudflare zone name (lorenzomaiuri.dev)."
  value       = data.cloudflare_zone.lorenzomaiuri.name
}
