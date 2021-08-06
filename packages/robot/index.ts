#!/usr/bin/env ts-node

// get secrets
import dotenv from 'dotenv'
import * as five from 'johnny-five'
import { arms } from './src/servo'
import { RaspiIO } from 'raspi-io'
import { createSQSListeningApp } from './src/sqs'
import { onMessage } from './src/events'

dotenv.config()

const board = new five.Board({
  io: new RaspiIO(),
})

board.on('ready', function () {
  const theArms = arms()

  // make the sqs app with the arms and the event handler for what we should do on those events
  const app = createSQSListeningApp(onMessage, theArms)

  // make it so we can get the arms in the repl by something a little easier
  board.repl.inject(theArms.map((arm, index) => ({ [`servo${index}`]: arm })))

  // start the app
  app.start()
})
