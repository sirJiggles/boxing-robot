import { stopHits } from '../combat'
import { sendMessage } from '../events'
import { armsOut, armsIn } from '../servo'
import { Message } from '../types'
import { WorkoutManager } from './'

jest.mock('../events')
jest.mock('../servo')
jest.mock('../combat')
// hide the logs
console.log = jest.fn()

describe('UNIT | workout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should keep calling tick only while the workout is running', async () => {
    const manager = new WorkoutManager()
    const tickSpy = jest.spyOn(manager, 'tick')
    manager.start(0.3)
    // wait for 3 ticks
    await new Promise((r) => setTimeout(r, 3000))
    expect(tickSpy).toBeCalledTimes(3)
    manager.stop()
  })

  it('should stop the workout at the end of the workout', async () => {
    const manager = new WorkoutManager()
    const stopSpy = jest.spyOn(manager, 'stop')
    manager.start(0.01)
    // wait for 1 tick
    await new Promise((r) => setTimeout(r, 1500))
    expect(stopSpy).toBeCalledTimes(1)
  })

  it('should send the ready event at the end of the workout', () => {
    const manager = new WorkoutManager()
    manager.stop()
    expect(sendMessage).toBeCalledWith(Message.ready)
  })

  it('should send the busy event at the start of the workout', () => {
    const manager = new WorkoutManager()
    manager.start(0.01)
    expect(sendMessage).toBeCalledWith(Message.busy)
    manager.stop()
  })

  it('should call arms out on start', () => {
    const manager = new WorkoutManager()
    manager.start(0.01)
    expect(armsOut).toBeCalledTimes(1)
    manager.stop()
  })

  it('should call arms in on stop', () => {
    const manager = new WorkoutManager()
    manager.start(0.01)
    manager.stop()
    expect(armsIn).toBeCalledTimes(1)
  })

  it('should stop hits on stop', () => {
    const manager = new WorkoutManager()
    manager.start(0.01)
    manager.stop()
    expect(stopHits).toBeCalledTimes(1)
  })
})
