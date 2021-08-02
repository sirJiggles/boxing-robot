import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import { runLambdaRole } from './runLambdaRole'
import { rolePolicyAttachment } from './rolePolicyAttachment'

const Lambda = () => {
  // make the role to be able to run it
  const role = runLambdaRole()

  // attach the policy
  rolePolicyAttachment(role)

  const variables: {
    [key: string]: string
  } = {
    // set other env vars here if needed later
  }

  // just make a simple lambda
  return new aws.lambda.Function('lambda', {
    code: new pulumi.asset.AssetArchive({
      // zip up the output of our serverless function
      '.': new pulumi.asset.FileArchive('../lambdas/dist'),
    }),
    handler: 'lambda-one/index.handler',
    runtime: 'nodejs12.x',
    role: role.arn,
    timeout: 10,
  })
}

export { Lambda }
