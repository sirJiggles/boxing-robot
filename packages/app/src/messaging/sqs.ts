import { SQSClient, ReceiveMessageCommand } from '@aws-sdk/client-sqs'

import { AppConfig } from '../types'
import Constants from 'expo-constants'

let pollingInterval: NodeJS.Timer

const config = Constants as unknown as AppConfig
const { region, accessKeyId, secretAccessKey, robotQueueUrl } =
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
    QueueUrl: robotQueueUrl,
  })

  sqsClient.send(receiveMessageFromBot)
}

export const pollForMessages = (
  // @TODO these guys
  onMessage?: () => void,
  onError?: () => void
) => {
  // just incase it was already called
  clearInterval(pollingInterval)
  // start polling the robot
  pollingInterval = setInterval(async () => {
    try {
      const messages = await hitTheRobotForMessages()
      console.log(JSON.stringify(messages, null, 2))
      // onMessage(message)
    } catch (err) {
      throw new Error(err)
      // onError(err)
    }
  }, 1000)
}
