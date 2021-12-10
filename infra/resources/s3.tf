terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.27"
    }
  }
}

resource "aws_s3_bucket" "movember_ui_bucket" {
  bucket = "movember-ui-${var.environment}"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "AES256"
      }
    }
  }

  tags = {
    Team = "Movember"
  }
}


resource "aws_s3_bucket_policy" "movember_policy" {
  bucket = aws_s3_bucket.movember_ui_bucket.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "EnforceTls"
        Effect    = "Deny"
        Principal = "*"
        Action    = "s3:*"
        Resource = [
          "${aws_s3_bucket.movember_ui_bucket.arn}/*",
          "${aws_s3_bucket.movember_ui_bucket.arn}",
        ]
        Condition = {
          Bool = {
            "aws:SecureTransport" = "false"
          }
          NumericLessThan = {
            "s3:TlsVersion" : 1.2
          }
        },
      },
      {
        Action = "s3:GetObject"
        Effect = "Allow"
        Principal = {
          AWS = "${aws_cloudfront_origin_access_identity.movember_ui.iam_arn}"
        }
        Resource = "${aws_s3_bucket.movember_ui_bucket.arn}/*"
      }
    ]
  })
}

resource "aws_s3_bucket_object" "movember_files" {
  for_each               = fileset("../../build/", "*")
  bucket                 = aws_s3_bucket.movember_ui_bucket.id
  key                    = each.value
  source                 = "../../build/${each.value}"
  etag                   = filemd5("../../build/${each.value}")
  server_side_encryption = "AES256"
  content_type           = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
}

resource "aws_s3_bucket_object" "movember_files_css" {
  for_each               = fileset("../../build/static/css", "*")
  bucket                 = aws_s3_bucket.movember_ui_bucket.id
  key                    = "static/css/${each.value}"
  source                 = "../../build/static/css/${each.value}"
  etag                   = filemd5("../../build/static/css/${each.value}")
  server_side_encryption = "AES256"
  content_type           = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
}

resource "aws_s3_bucket_object" "movember_files_js" {
  for_each               = fileset("../../build/static/js", "*")
  bucket                 = aws_s3_bucket.movember_ui_bucket.id
  key                    = "static/js/${each.value}"
  source                 = "../../build/static/js/${each.value}"
  etag                   = filemd5("../../build/static/js/${each.value}")
  server_side_encryption = "AES256"
  content_type           = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
}

resource "aws_s3_bucket_object" "movember_files_media" {
  for_each               = fileset("../../build/static/media", "*")
  bucket                 = aws_s3_bucket.movember_ui_bucket.id
  key                    = "static/media/${each.value}"
  source                 = "../../build/static/media/${each.value}"
  etag                   = filemd5("../../build/static/media/${each.value}")
  server_side_encryption = "AES256"
  content_type           = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
}

resource "aws_s3_bucket_object" "movember_files_public_images" {
  for_each               = fileset("../../public/images", "*")
  bucket                 = aws_s3_bucket.movember_ui_bucket.id
  key                    = "images/${each.value}"
  source                 = "../../public/images/${each.value}"
  etag                   = filemd5("../../public/images/${each.value}")
  server_side_encryption = "AES256"
  content_type           = lookup(local.mime_types, regex("\\.[^.]+$", each.value), null)
}

resource "aws_s3_bucket_public_access_block" "movember_public_block" {
  bucket                  = aws_s3_bucket.movember_ui_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

provider "aws" {
  profile = "default"
  region  = "ap-southeast-2"
}



