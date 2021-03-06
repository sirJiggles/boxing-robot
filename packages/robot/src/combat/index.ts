import { back, out, armSpeed } from '../servo'
import { combos } from './combos'
import { randomIntFromInterval } from './numbers'
import { ICombatManager, WorkoutConfig } from '../types'

export class CombatManager implements ICombatManager {
  // state for what is out and in, start up all up
  armsOut = [false, false, false, false]
  comboTimeout: NodeJS.Timeout | undefined
  config: WorkoutConfig
  combos: number[][] = []

  // state to let people know, we are working on a combo
  processingCombo = false

  constructor(config: WorkoutConfig) {
    this.config = config

    // based on the config, it could be that some of the arms are inactive
    // so we go through all the combos and make sure that we only do the ones
    // where the arms are enabled
    this.combos = combos
      .map((combo) =>
        combo.filter((hit) => this.config.armsEnabled?.includes(hit))
      )
      .filter(String)
  }

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

      // by default lets go somewhere in the middle for speed
      // 20 * 5 is 100
      let speed = armSpeed + 100

      if (this.config.difficulty) {
        // max is ten so if the value is 10 there is no multiplier
        // for how much slower we make it, as it is already the fastest
        const multiplier = 10 - this.config.difficulty
        speed = armSpeed + 20 * multiplier
      }

      out(number, speed)
      this.armsOut[number] = true

      setTimeout(() => {
        back(number, speed)
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
          }, speed + 100)
        }
      }, speed + 100)
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
    const combo = this.combos[Math.floor(Math.random() * this.combos.length)]

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

    // workout out the interval for the next combo, if nothing set use 2-4 secs as a default
    const { config } = this
    let nextComboFrom = 2
    let nextComboTo = 4

    if (config?.pauseDuration !== undefined) {
      const { pauseDuration } = config
      nextComboFrom = pauseDuration >= 1 ? pauseDuration - 1 : pauseDuration
      nextComboTo = pauseDuration + 1
    }

    const startComboTime =
      randomIntFromInterval(nextComboFrom, nextComboTo) * 1000

    // do the next combo between x and y seconds from now if not already doing one
    this.comboTimeout = setTimeout(this.startCombo.bind(this), startComboTime)

    // so we can test the timing of the function :D
    return startComboTime
  }
}
