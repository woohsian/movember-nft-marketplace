locals {
  s3_origin_id = "cps-movember-ui-s3-origin"
  mime_types = {
    ".html" : "text/html",
    ".js" : "application/javascript",
    ".css" : "text/css",
    ".map" : "application/json",
    ".json" : "application/json",
    ".txt" : "text/plain",
    ".svg" : "image/svg+xml",
    ".png" : "image/png",
    ".ico" : "image/vnd.microsoft.icon"
  }
}

variable "environment" {
  type = string
}

resource "aws_cloudfront_origin_access_identity" "movember_ui" {
  comment = "movember-ui-${var.environment}"
}
