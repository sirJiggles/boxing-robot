#!/usr/bin/env ts-node

// get secrets
import dotenv from 'dotenv'
dotenv.config()

import * as five from 'johnny-five'
import { initArms } from './src/servo'
import { RaspiIO } from 'raspi-io'
import { initPolling, sendMessage } from './src/events'
import { Message } from './src/types'

sendMessage(Message.starting)

initPolling()

const board = new five.Board({
  io: new RaspiIO(),
})

board.on('ready', function () {
  const arms = initArms()

  const replObj: { [key: string]: five.Servo } = {}
  arms.forEach((arm, index) => {
    replObj[`arm${index}`] = arm
  })

  // make it so we can get the arms in the repl by something a little easier
  board.repl.inject(replObj)

  sendMessage(Message.ready)
})
