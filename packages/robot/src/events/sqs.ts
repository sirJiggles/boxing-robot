import { Config } from '../types'
const { region, accessKeyId, secretAccessKey, queueForRobotToConsumeUrl } =
  process.env as Config
import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs'

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
    WaitTimeSeconds: 20,
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

export const checkForMessage = async (
  onMessage: (message: string) => void,
  onError: () => void
) => {
  try {
    const response = await hitTheRobotForMessages()
    const { Messages } = response
    // if we got back no message in the response start to poll again
    if (!Messages?.length) {
      checkForMessage(onMessage, onError)
      return
    }
    for (const message of Messages) {
      // send the message out
      const { Body, ReceiptHandle } = message
      if (!Body || !ReceiptHandle) {
        onError()
        throw new Error('there was no body or handle')
      }
      const { Message } = JSON.parse(Body)
      onMessage(Message)

      // remove the message
      await deleteMessageFromBotQueue(ReceiptHandle)

      // open the long poll again
      checkForMessage(onMessage, onError)
    }
  } catch (err) {
    onError()
    throw new Error(err)
  }
}
