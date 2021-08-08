import { doCombo, processingCombo, stopHits } from '../combat'
import { resetArms } from '../servo'

let running = false
let workoutDuration = 0
let timeSpentWorkingOut = 0
let tickInterval: NodeJS.Timeout
let comboTimeout: NodeJS.Timeout

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// a tick of a workout second
const tick = () => {
  // just bail if not running, means we were already stopped
  if (!running) {
    return
  }
  if (workoutDuration > timeSpentWorkingOut) {
    if (!processingCombo) {
      // do the next combo between x and y seconds from now if not already doing one
      comboTimeout = setTimeout(doCombo, randomIntFromInterval(2, 4) * 1000)
    }
    timeSpentWorkingOut += 1
    return
  }

  // at the end of the workout
  stop()
}

export const start = (duration: number) => {
  console.log('workout started')
  running = true
  // mins to seconds for duration of workout
  workoutDuration = duration * 60
  // start the ticker for the workout, every second
  tickInterval = setInterval(tick, 1000)
}

export const stop = () => {
  console.log('workout stopped')
  clearInterval(tickInterval)
  clearTimeout(comboTimeout)
  running = false
  workoutDuration = 0
  stopHits()
  resetArms()
}
