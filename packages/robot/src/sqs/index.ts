import { Config } from '../types'
import { Consumer } from 'sqs-consumer'
import { Servo } from 'johnny-five'
import AWS from 'aws-sdk'
import https from 'https'
import { back } from '../servo'

const { region, accessKeyId, secretAccessKey, queueUrl } = process.env as Config

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
})

// reset the arms if there is an error
const resetArms = (arms: Servo[]) => {
  arms.forEach((arm) => {
    back(arm)
  })
}

const handleError = (err: Error, arms?: Servo[]) => {
  if (arms) {
    resetArms(arms)
  }
  console.error(err.message)
  throw err
}

export const createSQSListeningApp = (
  onMessage: (message: any) => void,
  arms?: Servo[]
) => {
  const app = Consumer.create({
    region,
    queueUrl,
    handleMessage: async (message) => {
      onMessage(message)
    },
    sqs: new AWS.SQS({
      httpOptions: {
        agent: new https.Agent({
          keepAlive: true,
        }),
      },
    }),
  })

  app.on('error', (err) => {
    handleError(err, arms)
  })

  app.on('processing_error', (err) => {
    handleError(err, arms)
  })

  return app
}
