import * as aws from '@pulumi/aws'

export const sqsUser = (name: string) => {
  const user = new aws.iam.User(name, {
    path: '/system/',
  })

  return new aws.iam.AccessKey(`${name}AccessKey`, {
    user: user.name,
  })
}
