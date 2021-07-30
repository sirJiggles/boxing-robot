import {testServo} from './src/servo'
import * as five from 'johnny-five'
import { RaspiIO } from 'raspi-io'

const board = new five.Board({
  io: new RaspiIO(),
})


board.on('ready', function () {
  testServo()
})
