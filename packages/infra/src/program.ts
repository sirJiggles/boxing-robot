import { sqsQueue, sqsQueuePolicy } from './sqs'
import { snsSqsSubscription, snsTopic } from './sns'

const program = () => {
  // make a queue for the front end to poll, we can add more
  // queues here if we wanted to, to allow us to listen in
  // other services, for now let's just do the front end
  const frontEndQueue = sqsQueue('frontEndQueue')

  // make a topic and a subscription on the topic to the new queue
  const topic = snsTopic('notificationService')
  snsSqsSubscription('frontEndToSNS', topic, frontEndQueue.arn)

  // now we have both the sns and the sqs set up
  // we need to allow the sns to send the sqs queue events like so
  sqsQueuePolicy('frontEndToSNSPolicy', frontEndQueue, topic)

  // @TODO return what the stack will expose for the front end to poll
}

export default program
