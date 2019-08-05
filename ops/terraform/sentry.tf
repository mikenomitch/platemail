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

resource "sentry_project" "ui" {
    organization = "${sentry_organization.default.name}"
    team = "${sentry_team.default.name}"
    name = "ui"
    slug = "ui"
}

resource "sentry_key" "default" {
    organization = "${sentry_organization.default.slug}"
    project = "${sentry_project.ui.slug}"
    name = "UI Key"
}

// resource "sentry_project" "default" {
//     organization = "${sentry_organization.default.name}"
//     team = "${sentry_team.default.name}"
//     name = "backend"
//     slug = "backend"
// }

// resource "sentry_key" "default" {
//     organization = "${sentry_organization.default.slug}"
//     project = "${sentry_project.backend.slug}"
//     name = "Backend Key"
// }
