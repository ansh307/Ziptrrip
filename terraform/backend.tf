terraform {

  backend "s3" {

    bucket = "ziptrrip-testing-terraform-state"

    key = "terraform.tfstate"

    region = "ap-south-1"

    encrypt = true

  }

}
