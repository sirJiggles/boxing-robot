import { doHit } from '../combat'
import { MessagePayload, MessageBody, WorkoutConfig } from '../types'
import { start, stop } from '../workout'

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

  if (message === 'stop') {
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
