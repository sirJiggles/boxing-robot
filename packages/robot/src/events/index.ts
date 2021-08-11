import { PublishCommand } from '@aws-sdk/client-sns'
import { doHit } from '../combat'
import { WorkoutConfig, Message, Config } from '../types'
import { start, stop } from '../workout'
import { snsClient } from './sns'
import { pollForMessages } from './sqs'

const { topicForRobotToPostToArn } = process.env as Config

// @TODO we need better handling of the mixed type of messages
// if his gets more complex
const onMessage = (message: string) => {
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

// start polling for messages from the front end
export const startPolling = () => {
  pollForMessages(onMessage, onError, 1000)
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
