import { PublishCommand } from '@aws-sdk/client-sns'
import { CombatManager } from '../combat'
import { armsIn } from '../servo'
import { WorkoutConfig, Message, Config } from '../types'
import { WorkoutManager } from '../workout'
import { snsClient } from './sns'
import { checkForMessage } from './sqs'

const { topicForRobotToPostToArn } = process.env as Config

let workoutManager: WorkoutManager

// @TODO we need better handling of the mixed type of messages
// if his gets more complex
const onMessage = (message: string) => {
  const messageAsNumber = parseInt(message)

  // if we can convert the message to a number, it is an instruction to move an arm
  if (messageAsNumber) {
    // const manager = new WorkoutManager({})
    const manager = new CombatManager({})
    manager.doHit({ arm: messageAsNumber })
    return
  }

  if (message === Message.hug) {
    armsIn()
    return
  }

  if (message === Message.stopWorkout) {
    // someone might press stop before they press start
    if (workoutManager) {
      workoutManager.stop()
    }
    return
  }

  // if we are here it was a start workout command
  const workoutConfig = JSON.parse(message) as WorkoutConfig
  workoutManager = new WorkoutManager(workoutConfig)

  // last case it must be a call to start the workout
  workoutManager.start()
}

// just stop all the things on error
export const onError = () => {
  stop()
}

// start polling by calling the recursive check for message function
export const initPolling = () => {
  // the instance of the workout manager we will pass about as a dep
  checkForMessage(onMessage, onError)
}

export const sendMessage = async (message: Message) => {
  await snsClient.send(
    new PublishCommand({
      Message: message,
      TopicArn: topicForRobotToPostToArn,
    })
  )
}
