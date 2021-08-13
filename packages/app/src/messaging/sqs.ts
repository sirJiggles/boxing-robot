import {
  SQSClient,
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from '@aws-sdk/client-sqs'

import { AppConfig } from '../types'
import Constants from 'expo-constants'

const config = Constants as unknown as AppConfig
const { region, accessKeyId, secretAccessKey, queueForAppToConsumeUrl } =
  config.manifest.extra

export const sqsClient = new SQSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

const hitTheRobotForMessages = async () => {
  const receiveMessageFromBot = new ReceiveMessageCommand({
    QueueUrl: queueForAppToConsumeUrl,
    MaxNumberOfMessages: 1,
    WaitTimeSeconds: 20,
  })

  return sqsClient.send(receiveMessageFromBot)
}

const deleteMessageFromBotQueue = async (handle: string) => {
  const removeMessageFromBotQueue = new DeleteMessageCommand({
    QueueUrl: queueForAppToConsumeUrl,
    ReceiptHandle: handle,
  })

  return sqsClient.send(removeMessageFromBotQueue)
}

export const checkForMessage = async (
  onMessage: (message: string) => void,
  onError: (err: Error) => void
) => {
  try {
    const response = await hitTheRobotForMessages()
    const { Messages } = response
    Messages?.forEach((message) => {
      // send the message out
      const { Body, ReceiptHandle } = message
      if (!Body || !ReceiptHandle) {
        onError(new Error('there was no body or handle'))
        return
      }
      const { Message } = JSON.parse(Body)
      onMessage(Message)

      // remove the message
      deleteMessageFromBotQueue(ReceiptHandle)

      // open the long poll again
      checkForMessage(onMessage, onError)
    })
  } catch (err) {
    onError(new Error(err))
    return
  }
}
