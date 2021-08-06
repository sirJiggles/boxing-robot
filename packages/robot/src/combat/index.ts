import { back, out } from '../servo'

export const doHit = (arm: number) => {
  // go out and back in again
  out(arm)
  setTimeout(() => {
    back(arm)
  }, 1000)
}
