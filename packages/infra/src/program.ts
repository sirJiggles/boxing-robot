import { sqsQueue, sqsQueuePolicy } from './sqs';
import { snsSqsSubscription, snsTopic } from './sns';

const program = () => {
  // make a queue for the robot to poll, we can add more
  // queues here if we wanted to, to allow us to listen in
  // other services, for now let's just do the front end
  const eventQueue = sqsQueue('eventQueue');

  // make a topic and a subscription on the topic to the new queue
  // the topic will post messages, in our case that will be the
  // front end posting messages
  const frontEndTopic = snsTopic('frontEndTopic');
  snsSqsSubscription('frontEndToSNS', frontEndTopic, eventQueue.arn);

  // make another topic for the robot to listen to events
  const robotTopic = snsTopic('robotTopic');
  snsSqsSubscription('robotToSNS', robotTopic, eventQueue.arn);

  // now we have both the sns and the sqs set up
  // we need to allow the sns to send the sqs queue events like so
  sqsQueuePolicy('frontEndToSNSPolicy', eventQueue, frontEndTopic);

  // what do we want to output from the stack
  return {
    frontEndTopicArn: frontEndTopic.arn,
    thing: 'something',
  };
};

export default program;
