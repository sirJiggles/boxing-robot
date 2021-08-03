import { sqsQueue, sqsQueuePolicy } from './sqs'
import { snsSqsSubscription, snsTopic } from './sns'

const program = () => {
  // make a queue for the robot to poll, we can add more
  // queues here if we wanted to, to allow us to listen in
  // other services, for now let's just do the front end
  const boxingEventsQueue = sqsQueue('boxingEventsQueue')

  // This is the topic we will post to and listen to
  const boxingTopic = snsTopic('boxingTopic')

  // with this subscription the front end can push events of this topic to this queue
  snsSqsSubscription('frontEndSubscription', boxingTopic, boxingEventsQueue.arn)

  // make another topic for the robot to listen to events
  // it should remove events once they are polled
  snsSqsSubscription('robotToSNS', boxingTopic, boxingEventsQueue.arn)

  // now we have both the sns and the sqs set up
  // we need to allow the sns to send the sqs queue events like so
  sqsQueuePolicy('boxingSNSPolicy', boxingEventsQueue, boxingTopic)

  // what do we want to output from the stack
  return {
    boxingTopicArn: boxingTopic.arn,
    thing: 'something',
  }
}

export default program
