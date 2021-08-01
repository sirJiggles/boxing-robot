import * as aws from '@pulumi/aws'

const program = () => {
  // do the infra
  const topic = new aws.sns.Topic('mytopic')

  const topicSubscription = new aws.sns.TopicSubscription(
    'mytopicsubscription',
    {
      topic,
      protocol: 'sqs',
      endpoint: queue.arn,
    }
  )
}

export default program
