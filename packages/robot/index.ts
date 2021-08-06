#!/usr/bin/env ts-node

// get secrets
import dotenv from 'dotenv'
dotenv.config()

import { SQSClient, ReceiveMessageCommand } from '@aws-sdk/client-sqs'
import { Config } from './src/types'

const { region, accessKeyId, secretAccessKey, queueUrl } = process.env as Config

const client = new SQSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

const command = new ReceiveMessageCommand({
  QueueUrl: queueUrl,
})

const runIt = async () => {
  try {
    const data = await client.send(command)
    console.log(data)
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

runIt()

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
