import { Config } from '../types'
import { Consumer } from 'sqs-consumer'
import AWS from 'aws-sdk'
import https from 'https'

const { region, accessKeyId, secretAccessKey, queueUrl } = process.env as Config

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
})

const handleError = (err: Error) => {
  console.error(err.message)
  throw err
}

export const createSQSListeningApp = (
  onMessage: (message: any) => void,
  onError: () => void
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
    onError()
    handleError(err)
  })

  app.on('processing_error', (err) => {
    onError()
    handleError(err)
  })

  return app
}
