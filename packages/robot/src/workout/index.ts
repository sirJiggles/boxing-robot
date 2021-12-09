import { CombatManager } from '../combat'
import { sendMessage } from '../events'
import { IWorkoutManager, Message, WorkoutConfig } from '../types'

// given the state the workout manager needs to keep hold of a class seems to make
// more sense right now, it also makes thins simpler to test as all deps are
// locked in
export class WorkoutManager implements IWorkoutManager {
  running = false
  config: WorkoutConfig
  timeSpentWorkingOut = 0
  tickInterval: NodeJS.Timeout | undefined
  combatManager: CombatManager

  constructor(config: WorkoutConfig) {
    this.config = config
    // each instance of a workout manager should have a combat manager
    this.combatManager = new CombatManager(this.config)
  }

  tick() {
    // just bail if not running, means we were already stopped
    if (!this.running || !this.config.duration) {
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
    // let everyone know the bot is again free
    sendMessage(Message.ready)
    console.log('workout stopped')
    if (this.tickInterval) {
      clearInterval(this.tickInterval)
    }
    this.running = false
    this.combatManager.stopHits()
  }

  start() {
    console.log('workout started')
    // let everyone know the bot is busy
    sendMessage(Message.busy)

    this.running = true

    // do the first tick call
    this.tick()
    // start the ticker for the workout, every second
    // the bind this is needed as tick references this class instance
    this.tickInterval = setInterval(this.tick.bind(this), 1000)
  }
}
