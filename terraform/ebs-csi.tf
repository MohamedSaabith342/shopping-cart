# 1. Trust policy for EKS Pod Identity

data "aws_iam_policy_document" "ebs_csi_trust" {
  statement {
    effect = "Allow"

    actions = [
      "sts:AssumeRole",
      "sts:TagSession"
    ]

    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }
  }
}


# 2. Create IAM role for EBS CSI Driver

resource "aws_iam_role" "ebs_csi" {
  name = "shopverse-ebs-csi-role"

  assume_role_policy = data.aws_iam_policy_document.ebs_csi_trust.json
}


# 3. Attach AWS-managed permissions policy

resource "aws_iam_role_policy_attachment" "ebs_csi" {
  role = aws_iam_role.ebs_csi.name

  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEBSCSIDriverPolicy"
}


# 4. Associate IAM role with Kubernetes ServiceAccount

resource "aws_eks_pod_identity_association" "ebs_csi" {
  cluster_name    = module.eks.cluster_name
  namespace       = "kube-system"
  service_account = "ebs-csi-controller-sa"
  role_arn        = aws_iam_role.ebs_csi.arn

  depends_on = [
    aws_iam_role_policy_attachment.ebs_csi
  ]
}


# 5. Install AWS EBS CSI Driver

resource "aws_eks_addon" "ebs_csi" {
  cluster_name = module.eks.cluster_name
  addon_name   = "aws-ebs-csi-driver"

  depends_on = [
    aws_eks_pod_identity_association.ebs_csi,
    module.eks
  ]
}