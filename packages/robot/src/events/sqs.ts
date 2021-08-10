import { Config } from '../types'
const { region, accessKeyId, secretAccessKey, queueForRobotToConsumeUrl } =
  process.env as Config
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs'

let pollingInterval: NodeJS.Timer

export const sqsClient = new SQSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

const hitTheRobotForMessages = async () => {
  const receiveMessageFromBot = new ReceiveMessageCommand({
    QueueUrl: queueForRobotToConsumeUrl,
  })

  return sqsClient.send(receiveMessageFromBot)
}

const deleteMessageFromBotQueue = async (handle: string) => {
  const removeMessageFromBotQueue = new DeleteMessageCommand({
    QueueUrl: queueForRobotToConsumeUrl,
    ReceiptHandle: handle,
  })

  return sqsClient.send(removeMessageFromBotQueue)
}

export const pollForMessages = (
  onMessage: (message: string) => void,
  onError: () => void,
  duration = 30000
) => {
  // just incase it was already called
  clearInterval(pollingInterval)
  // start polling the robot
  pollingInterval = setInterval(async () => {
    try {
      const response = await hitTheRobotForMessages()
      const { Messages } = response
      Messages?.forEach((message) => {
        // send the message out
        const { Body, ReceiptHandle } = message
        if (!Body || !ReceiptHandle) {
          onError()
          throw new Error('there was no body or handle')
        }
        const { Message } = JSON.parse(Body)
        onMessage(Message)

        // remove the message
        deleteMessageFromBotQueue(ReceiptHandle)
      })
    } catch (err) {
      onError()
      throw new Error(err)
    }
  }, duration)
}
