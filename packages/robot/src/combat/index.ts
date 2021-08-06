import { back, out } from '../servo'

// state for what is out and in, start up all up
const armsOut = [false, false, false, false]

export const doHit = (arm: number) => {
  // go out and back in again
  // cannot go out if already out
  if (armsOut[arm]) {
    return
  }
  out(arm)
  armsOut[arm] = true
  setTimeout(() => {
    if (!armsOut[arm]) {
      back(arm)
      armsOut[arm] = false
    }
  }, 1000)
}
