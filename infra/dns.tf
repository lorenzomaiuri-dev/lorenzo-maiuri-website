locals {
  zone_id = var.cloudflare_zone_id
}

# ── CNAME records ──────────────────────────────────────────────────────────────

resource "cloudflare_dns_record" "cname_www" {
  zone_id = local.zone_id
  name    = "www"
  type    = "CNAME"
  content   = "lorenzomaiuri.dev"
  proxied = true
  ttl     = 1
}

resource "cloudflare_dns_record" "cname_api" {
  zone_id = local.zone_id
  name    = "api"
  type    = "CNAME"
  content   = "ghs.googlehosted.com"
  proxied = true
  ttl     = 1
}

# ── AAAA root — Cloudflare Workers proxy record ────────────────────────────────
# Created automatically when a Worker custom domain is bound to the root zone.
# Managed here to prevent drift; value 100:: is Cloudflare's anycast address.
#
#resource "cloudflare_dns_record" "aaaa_root" {
#  zone_id = local.zone_id
#  name    = "lorenzomaiuri.dev"
#  type    = "AAAA"
#  content   = "100::"
#  proxied = true
#  ttl     = 1
#}

# ── MX records — Cloudflare Email Routing ─────────────────────────────────────

#resource "cloudflare_dns_record" "mx_route1" {
#  zone_id  = local.zone_id
#  name     = "lorenzomaiuri.dev"
#  type     = "MX"
#  content    = "route1.mx.cloudflare.net"
#  priority = 67
#  proxied  = false
#  ttl      = 1
#}

#resource "cloudflare_dns_record" "mx_route2" {
#  zone_id  = local.zone_id
#  name     = "lorenzomaiuri.dev"
#  type     = "MX"
#  content    = "route2.mx.cloudflare.net"
#  priority = 97
#  proxied  = false
#  ttl      = 1
#}

#resource "cloudflare_dns_record" "mx_route3" {
#  zone_id  = local.zone_id
#  name     = "lorenzomaiuri.dev"
#  type     = "MX"
#  content    = "route3.mx.cloudflare.net"
#  priority = 29
#  proxied  = false
#  ttl      = 1
#}

# ── TXT records ────────────────────────────────────────────────────────────────

resource "cloudflare_dns_record" "txt_spf" {
  zone_id = local.zone_id
  name    = "lorenzomaiuri.dev"
  type    = "TXT"
  content   = "v=spf1 include:_spf.mx.cloudflare.net ~all"
  proxied = false
  ttl     = 1
}

resource "cloudflare_dns_record" "txt_google_verification" {
  zone_id = local.zone_id
  name    = "lorenzomaiuri.dev"
  type    = "TXT"
  content   = "google-site-verification=EILh1dQheSM1BYpnAIKh4hJnAgt2JvR9spMG0Xza-Wo"
  proxied = false
  ttl     = 3600
}

resource "cloudflare_dns_record" "txt_dmarc" {
  zone_id = local.zone_id
  name    = "_dmarc"
  type    = "TXT"
  content   = "v=DMARC1; p=none; rua=mailto:34ac6317c1dc413abc74ac57eff668e0lorenzomaiuri.devdmarc-reports.cloudflare.net"
  proxied = false
  ttl     = 1
}

# Cloudflare Email Routing DKIM key (cf2024-1).
# The key is split into two chunks in the DNS record for length compliance;
# stored here as a single concatenated string (the provider handles chunking).
#
#resource "cloudflare_dns_record" "txt_dkim" {
#  zone_id = local.zone_id
#  name    = "cf2024-1._domainkey"
#  type    = "TXT"
#  content   = "v=DKIM1; h=sha256; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiweykoi+o48IOGuP7GR3X0MOExCUDY/BCRHoWBnh3rChl7WhdyCxW3jgq1daEjPPqoi7sJvdg5hEQVsgVRQP4DcnQDVjGMbASQtrY4WmB1VebF+RPJB2ECPsEDTpeiI5ZyUAwJaVX7r6bznU67g7LvFq35yIo4sdlmtZGV+i0H4cpYH9+3JJ78km4KXwaf9xUJCWF6nxeD+qG6Fyruw1Qlbds2r85U9dkNDVAS3gioCvELryh1TxKGiVTkg4wqHTyHfWsp7KD3WQHYJn0RyfJJu6YEmL77zonn7p2SRMvTMP3ZEXibnC9gz3nnhR6wcYL8Q7zXypKTMD58bTixDSJwIDAQAB"
#  proxied = false
#  ttl     = 1
#}
