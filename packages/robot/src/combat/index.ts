import { back, out, armSpeed } from '../servo'

// state for what is out and in, start up all up
const armsOut = [false, false, false, false]

let comboTimeout: NodeJS.Timeout

const randomIntFromInterval = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// just slap some standard combos in there for now
const combos = [
  [1, 1, 2],
  [1, 1, 2],
  [1, 1, 2],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1],
  [1, 2],
  [1, 2],
  [1, 1],
  [1, 1],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [1, 2, 3, 4],
  [2],
  [3],
  [4],
  [4, 3],
  [4, 3],
]

// state to let people know, we are working on a combo
export let processingCombo = false

export const doHit = async (
  arm: number,
  asCombo?: boolean,
  nextArm?: number
) => {
  return new Promise((resolve, reject) => {
    // if doing a hit as part of a combo but now we should not
    // be processing one, just bail from here
    if (asCombo && !processingCombo) {
      resolve(true)
    }

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

      // if we are in a combo and the next arm is not the same as the one
      // that just hit already start the next arm
      // if (asCombo && nextArm !== arm) {
      //   resolve(true)
      //   return
      // }

      // give it time to get back (it might need to go out again)
      setTimeout(() => {
        // resolve the async func
        resolve(true)
      }, armSpeed)
    }, armSpeed)
  })
}

// what to do when we stop the hits
export const stopHits = () => {
  clearTimeout(comboTimeout)
  processingCombo = false
}

const startCombo = async () => {
  // pick a combo to do
  const combo = combos[Math.floor(Math.random() * combos.length)]
  let nextIndex = 0

  for (const move of combo) {
    nextIndex += 1
    // we wait as we only want to do the next move when the last one is done
    await doHit(move, true, combo[nextIndex] || undefined)
  }
  processingCombo = false
}

export const doCombo = () => {
  // when starting a combo, say we are now processing one
  processingCombo = true
  // do the next combo between x and y seconds from now if not already doing one
  comboTimeout = setTimeout(startCombo, randomIntFromInterval(1, 3) * 1000)
}
