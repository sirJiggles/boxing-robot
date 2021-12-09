import { sendMessage } from '../events'
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
    const manager = new WorkoutManager({
      duration: 0.4,
      difficulty: 5,
      pauseDuration: 3,
    })
    const tickSpy = jest.spyOn(manager, 'tick')
    manager.start()
    // wait for 3 ticks
    jest.advanceTimersByTime(3500)
    expect(tickSpy).toBeCalledTimes(4)
    manager.stop()
  })

  it('should stop the workout at the end of the workout', async () => {
    const manager = new WorkoutManager({
      duration: 0.01,
      difficulty: 5,
      pauseDuration: 3,
    })
    const stopSpy = jest.spyOn(manager, 'stop')
    manager.start()
    // wait for 1 tick
    jest.advanceTimersByTime(1500)
    expect(stopSpy).toBeCalledTimes(1)
  })

  it('should send the ready event at the end of the workout', () => {
    const manager = new WorkoutManager({
      duration: 0.01,
      difficulty: 5,
      pauseDuration: 3,
    })
    manager.stop()
    expect(sendMessage).toBeCalledWith(Message.ready)
  })

  it('should send the busy event at the start of the workout', () => {
    const manager = new WorkoutManager({
      duration: 0.01,
      difficulty: 5,
      pauseDuration: 3,
    })
    manager.start()
    expect(sendMessage).toBeCalledWith(Message.busy)
    manager.stop()
  })

  it('should call arms in on stop', () => {
    const manager = new WorkoutManager({
      duration: 0.01,
      difficulty: 5,
      pauseDuration: 3,
    })
    manager.start()
    manager.stop()
  })

  it('should stop hits on stop', () => {
    const manager = new WorkoutManager({
      duration: 0.01,
      difficulty: 5,
      pauseDuration: 3,
    })
    const stopSpy = jest.spyOn(manager.combatManager, 'stopHits')
    manager.start()
    manager.stop()
    expect(stopSpy).toBeCalledTimes(1)
  })
})
