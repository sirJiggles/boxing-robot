import { back, out } from '../servo'

// state for what is out and in, start up all up
const armsOut = [false, false, false, false]

// just slap some standard combos in there for now
const combos = [
  [1, 1, 2],
  [1, 2, 3],
  [1],
  [1, 2],
  [1, 1],
  [1, 2, 3, 4],
  [2],
  [3],
  [4],
  [4, 3],
]

// state to let people know, we are working on a combo
export let processingCombo = false

export const doHit = async (arm: number) => {
  return new Promise((resolve, reject) => {
    const number = arm - 1
    // go out and back in again
    // cannot go out if already out
    if (armsOut[number]) {
      resolve(true)
    }
    out(number)
    armsOut[number] = true
    setTimeout(() => {
      back(number)
      armsOut[number] = false
      // give it time to get back
      setTimeout(() => {
        // resolve the async func
        resolve(true)
      }, 500)
    }, 500)
  })
}

// what to do when we stop the hits
export const stopHits = () => {
  processingCombo = false
}

export const doCombo = async () => {
  // when starting a combo, say we are now processing one
  processingCombo = true
  // pick a combo to do
  const combo = combos[Math.floor(Math.random() * combos.length)]
  for await (let move of combo) {
    // we wait as we only want to do the next move when the last one is done
    await doHit(move)
  }
  processingCombo = false
}
