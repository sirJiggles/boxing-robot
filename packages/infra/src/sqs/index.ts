import * as aws from '@pulumi/aws'
import * as pulumi from '@pulumi/pulumi'

const sqsQueuePolicy = (
  name: string,
  queue: aws.sqs.Queue,
  topic: aws.sns.Topic,
) => {
  return new aws.sqs.QueuePolicy(name, {
    queueUrl: queue.id,
    policy: pulumi.interpolate`{
      "Version": "2012-10-17",
      "Id": "sqspolicy",
      "Statement": [
        {
          "Sid": "First",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "sqs:SendMessage",
          "Resource": "${queue.arn}",
          "Condition": {
            "ArnEquals": {
              "aws:SourceArn": "${topic.arn}"
            }
          }
        }
      ]
    }
    `,
  })
}

const sqsQueue = (name: string) => {
  return new aws.sqs.Queue(name)
}

export { sqsQueue, sqsQueuePolicy }
