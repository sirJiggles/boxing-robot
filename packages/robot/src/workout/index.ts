import { CombatManager } from '../combat'
import { sendMessage } from '../events'
import { armsOut } from '../servo'
import { IWorkoutManager, Message, WorkoutConfig } from '../types'

// given the state the workout manager needs to keep hold of a class seems to make
// more sense right now, it also makes thins simpler to test as all deps are
// locked in
export class WorkoutManager implements IWorkoutManager {
  running = false
  config: WorkoutConfig | undefined
  timeSpentWorkingOut = 0
  tickInterval: NodeJS.Timeout | undefined
  combatManager: CombatManager

  constructor() {
    // each instance of a workout manager should have a combat manager
    this.combatManager = new CombatManager()
  }

  tick() {
    // just bail if not running, means we were already stopped
    if (!this.running || !this.config) {
      return
    }
    if (this.config.duration * 60 > this.timeSpentWorkingOut) {
      if (!this.combatManager.processingCombo) {
        this.combatManager.doCombo()
      }
      this.timeSpentWorkingOut += 1
      return
    }

    // at the end of the workout
    this.stop()
  }

  stop() {
    console.log('workout stopped')
    if (this.tickInterval) {
      clearInterval(this.tickInterval)
    }
    this.running = false
    this.config = undefined
    this.combatManager.stopHits()
    // let everyone know the bot is again free
    sendMessage(Message.ready)
  }

  start(config: WorkoutConfig) {
    console.log('workout started')
    armsOut()
    this.running = true
    // store the config for the workout
    this.config = config
    // set the config also on the combat manager instance as they need it too
    this.combatManager.config = config

    // do the first tick call
    this.tick()
    // start the ticker for the workout, every second
    // the bind this is needed as tick references this class instance
    this.tickInterval = setInterval(this.tick.bind(this), 1000)
    // let everyone know the bot is busy
    sendMessage(Message.busy)
  }
}
