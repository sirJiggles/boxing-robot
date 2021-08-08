#!/usr/bin/env ts-node

// get secrets
import dotenv from 'dotenv'
import * as five from 'johnny-five'
import { initArms, resetArms } from './src/servo'
import { RaspiIO } from 'raspi-io'
import { createSQSListeningApp } from './src/sqs'
import { onMessage, onError } from './src/events'

dotenv.config()

const board = new five.Board({
  io: new RaspiIO(),
})

board.on('ready', function () {
  const arms = initArms()

  // make the sqs app with the arms and the event handler for what we should do on those events
  const app = createSQSListeningApp(onMessage, onError)

  const replObj: { [key: string]: five.Servo } = {}
  arms.forEach((arm, index) => {
    replObj[`arm${index}`] = arm
  })

  // make it so we can get the arms in the repl by something a little easier
  board.repl.inject(replObj)

  // start the app
  app.start()
})
