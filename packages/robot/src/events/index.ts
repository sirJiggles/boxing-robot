import { PublishCommand } from '@aws-sdk/client-sns'
import { doHit } from '../combat'
import { WorkoutConfig, Message, Config } from '../types'
import { WorkoutManager } from '../workout'
import { snsClient } from './sns'
import { checkForMessage } from './sqs'

const { topicForRobotToPostToArn } = process.env as Config

// @TODO we need better handling of the mixed type of messages
// if his gets more complex
const onMessage = (message: string, workoutManager: WorkoutManager) => {
  const messageAsNumber = parseInt(message)

  // if we can convert the message to a number, it is an instruction to move an arm
  if (messageAsNumber) {
    doHit(messageAsNumber)
    return
  }

  if (message === Message.stopWorkout) {
    workoutManager.stop()
    return
  }

  // if we are here it was a start workout command
  const workoutConfig = JSON.parse(message) as WorkoutConfig
  workoutManager.start(workoutConfig.duration)
}

// just stop all the things on error
export const onError = () => {
  stop()
}

// start polling by calling the recursive check for message function
export const initPolling = () => {
  // the instance of the workout manager we will pass about as a dep
  const workoutManager = new WorkoutManager()
  checkForMessage(onMessage, onError, workoutManager)
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
