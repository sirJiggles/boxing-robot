import { sqsQueue, sqsQueuePolicy } from './sqs'
import { snsSqsSubscription, snsTopic } from './sns'
import * as pulumi from '@pulumi/pulumi'
import * as aws from '@pulumi/aws'
import { sqsUser } from './iam'

const program = () => {
  // queues for the robot and the app to post to
  const queueForRobotToConsume = sqsQueue('queueForRobotToConsume')
  const queueForAppToConsume = sqsQueue('queueForAppToConsume')

  // make some topics for the posters to post to
  const topicForAppToPostTo = snsTopic('topicForAppToPostTo')
  const topicForRobotToPostTo = snsTopic('topicForRobotToPostTo')

  // things the robot posts should go to the queue the app listens too
  snsSqsSubscription(
    'robotSubscription',
    topicForRobotToPostTo,
    queueForAppToConsume.arn
  )
  // things the app posts should go to the queue the robot listens too
  snsSqsSubscription(
    'appSubscription',
    topicForAppToPostTo,
    queueForRobotToConsume.arn
  )

  // now we have both the sns and the sqs set up
  // we need to allow the sns to send the sqs queue events like so
  sqsQueuePolicy(
    'robotQueuePolicy',
    queueForAppToConsume,
    topicForRobotToPostTo
  )
  sqsQueuePolicy('appQueuePolicy', queueForRobotToConsume, topicForAppToPostTo)

  // one user can do things in both this is fine
  const accessKey = sqsUser('sqsUser')

  // what do we want to output from the stack
  return {
    topicForRobotToPostToArn: topicForRobotToPostTo.arn,
    topicForAppToPostToArn: topicForAppToPostTo.arn,
    region: pulumi.output(aws.getRegion()).name,
    secretAccessKey: pulumi.output(accessKey.secret),
    accessKeyId: pulumi.output(accessKey.id),
    queueForAppToConsumeUrl: pulumi.output(queueForAppToConsume.id),
    queueForRobotToConsumeUrl: pulumi.output(queueForRobotToConsume.id),
  }
}

export default program
