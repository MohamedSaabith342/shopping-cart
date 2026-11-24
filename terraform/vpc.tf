module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 6.0"

  name = "${var.project_name}-vpc"
  cidr = var.vpc_cidr

  # Availability zones
  azs = var.availability_zones

  # Subnets
  public_subnets  = var.public_subnets
  private_subnets = var.private_subnets

  # Internet Gateway
  create_igw = true

  # NAT Gateway
  enable_nat_gateway = true
  single_nat_gateway = true

  # VPN Gateway
  enable_vpn_gateway = false

  # DNS settings
  enable_dns_hostnames = true
  enable_dns_support   = true

  # Default security group
  manage_default_security_group = true

  default_security_group_ingress = []
  default_security_group_egress  = []

  # Public subnet tags
  public_subnet_tags = {
    "kubernetes.io/role/elb" = "1"
  }

  # Private subnet tags
  private_subnet_tags = {
    "kubernetes.io/role/internal-elb" = "1"
  }

  tags = {
    Terraform   = "true"
    Environment = var.environment
    Project     = var.project_name
  }
}