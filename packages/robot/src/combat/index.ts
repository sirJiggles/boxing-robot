import { back, out, armSpeed } from '../servo'
import { combos } from './combos'
import { randomIntFromInterval } from './numbers'
import { ICombatManager } from '../types'

export class CombatManager implements ICombatManager {
  // state for what is out and in, start up all up
  armsOut = [false, false, false, false]
  comboTimeout: NodeJS.Timeout | undefined

  // state to let people know, we are working on a combo
  processingCombo = false

  // function to do a single hit
  doHit = async ({
    arm,
    asCombo,
    nextArm,
  }: {
    arm: number
    asCombo?: boolean
    nextArm?: number
  }) => {
    return new Promise((resolve) => {
      // if doing a hit as part of a combo but now we should not
      // be processing one, just bail from here
      if (asCombo && !this.processingCombo) {
        resolve(true)
        return
      }

      const number = arm - 1
      // go out and back in again
      // cannot go out if already out
      if (this.armsOut[number]) {
        resolve(true)
        return
      }
      out(number)
      this.armsOut[number] = true

      setTimeout(() => {
        back(number)
        // if we are in a combo and the next arm is not the same as the one
        // that just hit already start the next arm
        if (asCombo && nextArm !== arm) {
          resolve(true)
          this.armsOut[number] = false
        } else {
          // give it time to get back (it might need to go out again)
          setTimeout(() => {
            // resolve the async func
            resolve(true)
            this.armsOut[number] = false
          }, armSpeed)
        }
      }, armSpeed)
    })
  }

  // what to do when we stop the hits
  stopHits = () => {
    if (this.comboTimeout) {
      clearTimeout(this.comboTimeout)
    }
    this.processingCombo = false
  }

  startCombo = async () => {
    // pick a combo to do
    const combo = combos[Math.floor(Math.random() * combos.length)]
    let nextIndex = 0

    for (const move of combo) {
      nextIndex += 1
      // we wait as we only want to do the next move when the last one is done
      await this.doHit({
        arm: move,
        asCombo: true,
        nextArm: combo[nextIndex] || undefined,
      })
    }
    this.processingCombo = false
  }

  doCombo = () => {
    // when starting a combo, say we are now processing one
    this.processingCombo = true
    // do the next combo between x and y seconds from now if not already doing one
    this.comboTimeout = setTimeout(
      this.startCombo.bind(this),
      randomIntFromInterval(2, 4) * 1000
    )
  }
}
