import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
import { doHit } from '../combat'
import {
  MessagePayload,
  MessageBody,
  WorkoutConfig,
  Message,
  Config,
} from '../types'
import { start, stop } from '../workout'

// grab the things we need of the env to configure the client
const { region, accessKeyId, secretAccessKey, topicForRobotToPostToArn } =
  process.env as Config

// the sns client to post our events too
const snsClient = new SNSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

// @TODO we need better handling of the mixed type of messages
// if his gets more complex
export const onMessage = (payload: MessagePayload) => {
  const parsedBody = JSON.parse(payload.Body) as MessageBody
  if (!parsedBody) {
    throw new Error('could not pass the body of the message')
  }
  const message = parsedBody.Message
  const messageAsNumber = parseInt(message)

  // if we can convert the message to a number, it is an instruction to move an arm
  if (messageAsNumber) {
    doHit(messageAsNumber)
    return
  }

  if (message === Message.stopWorkout) {
    stop()
    return
  }

  // if we are here it was a start workout command
  const workoutConfig = JSON.parse(message) as WorkoutConfig
  start(workoutConfig.duration)
}

// just stop all the things on error
export const onError = () => {
  stop()
}

export const sendMessage = async (message: Message) => {
  console.log(`should be sending ${message}`)
  await snsClient.send(
    new PublishCommand({
      Message: message,
      TopicArn: topicForRobotToPostToArn,
    })
  )
}
