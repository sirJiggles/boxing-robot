import { doHit } from '../combat'
import { resetArms } from '../servo'
import { MessagePayload, MessageBody } from '../types'

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
  }
}

export const onError = () => {
  resetArms()
}
