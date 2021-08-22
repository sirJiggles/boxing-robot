import { sendMessage } from '../events'
import { armsOut, armsIn } from '../servo'
import { Message } from '../types'
import { WorkoutManager } from './'

jest.mock('../events')
jest.mock('../servo')
jest.mock('../combat', () => {
  return {
    CombatManager: jest.fn().mockImplementation(() => {
      return {
        doHit: () => {
          return undefined
        },
        startCombo: () => {
          return undefined
        },
        stopHits: () => {
          return undefined
        },
        doCombo: () => {
          return undefined
        },
      }
    }),
  }
})
// hide the logs
console.log = jest.fn()

// fake timers so we can run tests fast
jest.useFakeTimers()

describe('UNIT | workout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should keep calling tick only while the workout is running', async () => {
    const manager = new WorkoutManager()
    const tickSpy = jest.spyOn(manager, 'tick')
    manager.start({ duration: 0.4, difficulty: 5, pauseDuration: 3 })
    // wait for 3 ticks
    jest.advanceTimersByTime(3500)
    expect(tickSpy).toBeCalledTimes(4)
    manager.stop()
  })

  it('should stop the workout at the end of the workout', async () => {
    const manager = new WorkoutManager()
    const stopSpy = jest.spyOn(manager, 'stop')
    manager.start({ duration: 0.01, difficulty: 5, pauseDuration: 3 })
    // wait for 1 tick
    jest.advanceTimersByTime(1500)
    expect(stopSpy).toBeCalledTimes(1)
  })

  it('should send the ready event at the end of the workout', () => {
    const manager = new WorkoutManager()
    manager.stop()
    expect(sendMessage).toBeCalledWith(Message.ready)
  })

  it('should send the busy event at the start of the workout', () => {
    const manager = new WorkoutManager()
    manager.start({ duration: 0.01, difficulty: 5, pauseDuration: 3 })
    expect(sendMessage).toBeCalledWith(Message.busy)
    manager.stop()
  })

  it('should call arms out on start', () => {
    const manager = new WorkoutManager()
    manager.start({ duration: 0.01, difficulty: 5, pauseDuration: 3 })
    expect(armsOut).toBeCalledTimes(1)
    manager.stop()
  })

  it('should call arms in on stop', () => {
    const manager = new WorkoutManager()
    manager.start({ duration: 0.01, difficulty: 5, pauseDuration: 3 })
    manager.stop()
    expect(armsIn).toBeCalledTimes(1)
  })

  it('should stop hits on stop', () => {
    const manager = new WorkoutManager()
    const stopSpy = jest.spyOn(manager.combatManager, 'stopHits')
    manager.start({ duration: 0.01, difficulty: 5, pauseDuration: 3 })
    manager.stop()
    expect(stopSpy).toBeCalledTimes(1)
  })
})
