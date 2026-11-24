module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 21.0"

  # Cluster configuration
  name               = "${var.project_name}-eks"
  kubernetes_version = var.kubernetes_version

  # API endpoint configuration
  endpoint_public_access  = true
  endpoint_private_access = true

  endpoint_public_access_cidrs = var.cluster_public_access_cidrs

  # Authentication
  authentication_mode = "API"

  enable_cluster_creator_admin_permissions = true

  # VPC configuration
  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  # Security groups
  create_security_group      = true
  create_node_security_group = true

  # Control plane logging
  enabled_log_types = [
    "api",
    "audit",
    "authenticator",
    "controllerManager",
    "scheduler"
  ]

  cloudwatch_log_group_retention_in_days = 7

  # EKS add-ons
  addons = {
    coredns = {}

    kube-proxy = {}

    vpc-cni = {
      before_compute = true
    }

    eks-pod-identity-agent = {
      before_compute = true
    }
  }

  # Managed node group
  eks_managed_node_groups = {
    shopverse = {
      name = "${var.project_name}-nodes"

      ami_type = "AL2023_x86_64_STANDARD"

      instance_types = [
        var.node_instance_type
      ]

      capacity_type = "ON_DEMAND"

      min_size     = var.node_min_size
      max_size     = var.node_max_size
      desired_size = var.node_desired_size

      subnet_ids = module.vpc.private_subnets

      # Node IAM role
      create_iam_role = true

      iam_role_attach_cni_policy = true

      labels = {
        Environment = var.environment
        Application = var.project_name
      }

      tags = {
        Project     = var.project_name
        Environment = var.environment
      }
    }
  }

  tags = {
    Terraform   = "true"
    Environment = var.environment
    Project     = var.project_name
  }
}