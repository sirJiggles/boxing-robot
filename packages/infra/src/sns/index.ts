import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

const snsTopic = (name: string) => {
  return new aws.sns.Topic(name, {
    // allow all users to publish, receive and subscribe
    policy: pulumi.interpolate`
    {
      "Version": "2008-10-17",
      "Id": "boxingTopicStatement",
      "Statement": [
        {
          "Sid": "boxingTopicStatementId",
          "Effect": "Allow",
          "Principal": "*",
          "Action": [
            "SNS:Subscribe",
            "SNS:Publish",
            "SNS:Receive"
          ],
          "Resource": "*"
        }
      ]
    }`,
  })
}

const snsSqsSubscription = (
  name: string,
  topic: aws.sns.Topic,
  queueArn: pulumi.Output<string>
) => {
  const subscription = new aws.sns.TopicSubscription(name, {
    topic,
    protocol: 'sqs',
    endpoint: queueArn,
  })

  return subscription
}

export { snsTopic, snsSqsSubscription }
