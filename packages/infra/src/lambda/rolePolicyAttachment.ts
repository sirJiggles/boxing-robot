import * as aws from '@pulumi/aws'

export const rolePolicyAttachment = (role: aws.iam.Role) => {
  new aws.iam.RolePolicyAttachment('lambdaPolicyAttachment', {
    role,
    policyArn: aws.iam.ManagedPolicy.LambdaFullAccess,
  })
}

export default rolePolicyAttachment
