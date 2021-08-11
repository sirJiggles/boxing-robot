import { doCombo, processingCombo, stopHits } from '../combat'
import { sendMessage } from '../events'
import { armsOut } from '../servo'
import { Message } from '../types'

let running = false
let workoutDuration = 0
let timeSpentWorkingOut = 0
let tickInterval: NodeJS.Timeout

// a tick of a workout second
const tick = () => {
  // just bail if not running, means we were already stopped
  if (!running) {
    return
  }
  if (workoutDuration > timeSpentWorkingOut) {
    if (!processingCombo) {
      doCombo()
    }
    timeSpentWorkingOut += 1
    return
  }

  // at the end of the workout
  stop()
}

export const start = (duration: number) => {
  console.log('workout started')
  armsOut()
  running = true
  // mins to seconds for duration of workout
  workoutDuration = duration * 60
  // start the ticker for the workout, every second
  tickInterval = setInterval(tick, 1000)
  // let everyone know the bot is busy
  sendMessage(Message.busy)
}

export const stop = () => {
  console.log('workout stopped')
  clearInterval(tickInterval)
  running = false
  workoutDuration = 0
  stopHits()
  armsOut()
  // let everyone know the bot is again free
  sendMessage(Message.ready)
}
