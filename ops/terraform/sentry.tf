# Configure the Sentry Provider
provider "sentry" {
  token = "${var.sentry_token}"
  base_url = "${var.sentry_base_url}"
}

resource "sentry_organization" "default" {
    name = "Platemail"
    slug = "platemail"
    agree_terms = true
}

resource "sentry_team" "default" {
    organization = "${sentry_organization.default.name}"
    name = "${sentry_organization.default.name}"
    slug = "${sentry_organization.default.slug}"
}

resource "sentry_project" "default" {
    organization = "${sentry_organization.default.name}"
    team = "${sentry_team.default.name}"
    name = "ui"
    slug = "ui"
}

resource "sentry_project" "default" {
    organization = "${sentry_organization.default.name}"
    team = "${sentry_team.default.name}"
    name = "backend"
    slug = "backend"
}