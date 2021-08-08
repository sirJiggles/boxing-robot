import { back, out } from '../servo'

// state for what is out and in, start up all up
const armsOut = [false, false, false, false]

export const doHit = (arm: number) => {
  const number = arm -1 
  // go out and back in again
  // cannot go out if already out
  if (armsOut[number]) {
    return
  }
  out(number)
  armsOut[number] = true
  setTimeout(() => {
    if (armsOut[number]) {
      back(number)
      armsOut[number] = false
    }
  }, 700)
}
