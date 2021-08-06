#!/usr/bin/env ts-node

// get secrets
import dotenv from 'dotenv'
dotenv.config()

// import { SQSClient, ReceiveMessageCommand, Message } from '@aws-sdk/client-sqs'
import { Config } from './src/types'
import { Consumer } from 'sqs-consumer'
import AWS from 'aws-sdk'
import https from 'https'

const { region, accessKeyId, secretAccessKey, queueUrl } = process.env as Config

// const client = new SQSClient({
//   region,
//   credentials: {
//     accessKeyId,
//     secretAccessKey,
//   },
// })

// const command = new ReceiveMessageCommand({
//   QueueUrl: queueUrl,
// })

AWS.config.update({
  region,
  accessKeyId,
  secretAccessKey,
})

const app = Consumer.create({
  region,
  queueUrl,
  handleMessage: async (message) => {
    console.log(JSON.parse(message.Body).Message)
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
  console.error(err.message)
})

app.on('processing_error', (err) => {
  console.error(err.message)
})

app.start()

// const handleMessage = (messages: Message[] = []) => {
//   // if no messages then exit
//   if (!messages.length) {
//     return
//   }
//   const message
// }

// const pollForMessages = async () => {
//   try {
//     const data = await client.send(command)
//     handleMessage(data.Messages)
//   } catch (err) {
//     console.log(err)
//     throw new Error(err)
//   }
// }

// pollForMessages()

// import { testServo } from './src/servo'
// import * as five from 'johnny-five'
// import { RaspiIO } from 'raspi-io'

// const board = new five.Board({
//   io: new RaspiIO(),
// })

// board.on('ready', function () {
//   const servo = testServo()
//   board.repl.inject({ servo })
// })
