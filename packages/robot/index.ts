#!/usr/bin/env ts-node

// get secrets
import dotenv from 'dotenv'
import * as five from 'johnny-five'
import { initArms } from './src/servo'
import { RaspiIO } from 'raspi-io'
import { sendMessage, startPolling } from './src/events'
import { Message } from './src/types'

dotenv.config()

sendMessage(Message.starting)

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
