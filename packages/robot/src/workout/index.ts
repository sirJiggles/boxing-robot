import { doCombo, processingCombo, stopHits } from '../combat'
import { armsOut, armsIn } from '../servo'

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
}

export const stop = () => {
  console.log('workout stopped')
  clearInterval(tickInterval)
  running = false
  workoutDuration = 0
  stopHits()
  armsIn()
}
