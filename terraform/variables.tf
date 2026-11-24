variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-south-1"
}

variable "aws_profile" {
  description = "AWS CLI profile"
  type        = string
  default     = "terraform-user"
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "shopverse"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "VPC CIDR block"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "Availability zones"
  type        = list(string)

  default = [
    "ap-south-1a",
    "ap-south-1b"
  ]
}

variable "public_subnets" {
  description = "Public subnet CIDR blocks"
  type        = list(string)

  default = [
    "10.0.101.0/24",
    "10.0.102.0/24"
  ]
}

variable "private_subnets" {
  description = "Private subnet CIDR blocks"
  type        = list(string)

  default = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]
}

variable "kubernetes_version" {
  description = "EKS Kubernetes version"
  type        = string
  default     = "1.34"
}

variable "node_instance_type" {
  description = "EC2 instance type for worker nodes"
  type        = string
  default     = "c7i-flex.large"
}

variable "node_min_size" {
  type    = number
  default = 1
}

variable "node_max_size" {
  type    = number
  default = 3
}

variable "node_desired_size" {
  type    = number
  default = 2
}

variable "cluster_public_access_cidrs" {
  description = "CIDRs allowed to access the public Kubernetes API"
  type        = list(string)
  default     = ["0.0.0.0/0"]
}