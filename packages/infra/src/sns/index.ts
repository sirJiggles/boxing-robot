import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

const snsTopic = (name: string) => {
  return new aws.sns.Topic(name)
}

const snsSqsSubscription = (
  name: string,
  topic: aws.sns.Topic,
  queueArn: pulumi.Output<string>,
) => {
  const subscription = new aws.sns.TopicSubscription(name, {
    topic,
    protocol: 'sqs',
    endpoint: queueArn,
  })

  return subscription
}

export { snsTopic, snsSqsSubscription }
