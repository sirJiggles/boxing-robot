import { CombatManager } from './'
import { out, back } from '../servo'
import * as util from 'util'

// you cannot use this in the mock, the mock is loaded first
const armSpeed = 300

jest.mock('../servo', () => {
  return {
    out: jest.fn(),
    back: jest.fn(),
    armSpeed: 300,
  }
})

jest.mock('./combos', () => {
  return {
    // so we can test how many hits were called in a combo etc
    combos: [[1, 2, 3]],
  }
})

describe('Unit | combat', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('single hit functionality "doHit"', () => {
    // this is usually if someone tells the combo system to stop in middle of a combo
    it('should not keep doing combo hits if the processing flag was set to false', async () => {
      const manager = new CombatManager({})
      manager.processingCombo = false
      await manager.doHit({ arm: 1, asCombo: true })
      expect(out).not.toHaveBeenCalled()
    })

    it('should not do a hit for an arm that is already out', async () => {
      const manager = new CombatManager({})
      manager.armsOut = [true, false, false, false]
      await manager.doHit({ arm: 1 })
      expect(out).not.toHaveBeenCalled()
    })

    it('should do the hit and back under normal operations', async () => {
      const manager = new CombatManager({})
      await manager.doHit({ arm: 1 })
      expect(out).toHaveBeenCalledTimes(1)
      expect(back).toHaveBeenCalledTimes(1)
    })

    it('should resolve faster if we are doing a combo and the next hit is not this arm', async () => {
      const manager = new CombatManager({})
      manager.processingCombo = true
      const p = manager.doHit({ arm: 1, nextArm: 2, asCombo: true })
      // pause for the time it takes to get the arm our
      await new Promise((r) => setTimeout(r, armSpeed))
      // the promise p should be resolved by now
      expect(util.inspect(p).includes('pending')).toBeFalsy()
    })

    it('should not resolve so quick if the same arm is the next one in the combo', async () => {
      const manager = new CombatManager({})
      manager.processingCombo = true
      const p = manager.doHit({ arm: 1, nextArm: 1, asCombo: true })
      // pause for the time it takes to get the arm our
      await new Promise((r) => setTimeout(r, armSpeed))
      // the promise p should still be pending as we are also coming back now
      expect(util.inspect(p).includes('pending')).toBeTruthy()
    })

    it('should resolve after the speed to come in and out if the same arm is the next one in the combo', async () => {
      const manager = new CombatManager({})
      manager.processingCombo = true
      const p = manager.doHit({ arm: 1, nextArm: 1, asCombo: true })
      // pause for the time it takes to get the arm our
      await new Promise((r) => setTimeout(r, armSpeed * 2 + 100))
      // the promise p should no longer be pending as we are also coming back now
      expect(util.inspect(p).includes('pending')).toBeFalsy()
    })
  })

  describe('starting and stopping', () => {
    it('should stop correctly when told to', () => {
      const manager = new CombatManager({ armsEnabled: [1, 2, 3, 4] })
      manager.processingCombo = true
      manager.comboTimeout = setTimeout(() => true, 50000)
      manager.stopHits()
      expect(manager.processingCombo).toEqual(false)
      expect(
        util.inspect(manager.comboTimeout).includes('_destroyed: true')
      ).toEqual(true)
    })

    it('should call a combo then reset everything', async () => {
      const manager = new CombatManager({ armsEnabled: [1, 2, 3, 4] })
      await manager.startCombo()
      expect(manager.armsOut).toEqual([false, false, false, false])
      expect(manager.processingCombo).toEqual(false)
    })

    it('should call the hits the right amount of times in a combo', async () => {
      const manager = new CombatManager({ armsEnabled: [1, 2, 3, 4] })
      const hitSpy = jest.spyOn(manager, 'doHit')
      await manager.startCombo()
      expect(hitSpy).toHaveBeenCalledTimes(3)
    })
  })

  describe('doing a delayed combo', () => {
    it('should call the start combo function and set doing combo', async () => {
      const manager = new CombatManager({
        difficulty: 1,
        duration: 1,
        pauseDuration: 0,
        armsEnabled: [1, 2, 3, 4],
      })
      // mock start combo, so it also does not reset the processing combo flag
      manager.startCombo = jest.fn()
      manager.doCombo()
      await new Promise((r) => setTimeout(r, 1000))
      expect(manager.processingCombo).toEqual(true)
      expect(manager.startCombo).toHaveBeenCalledTimes(1)
      manager.stopHits()
    })
  })

  describe('pause duration config for combos', () => {
    it('should have less of a pause with a lower value', async () => {
      const manager = new CombatManager({
        difficulty: 5,
        pauseDuration: 1,
        duration: 0.1,
        armsEnabled: [1, 2, 3, 4],
      })

      // mock start combo, so it also does not reset the processing combo flag
      manager.startCombo = jest.fn()
      const time = manager.doCombo()
      await new Promise((r) => setTimeout(r, 1000))
      expect(time).toBeLessThanOrEqual(2000)
      manager.stopHits()
    })
    it('should have more of a pause with a lower value', async () => {
      const manager = new CombatManager({
        difficulty: 5,
        pauseDuration: 4,
        duration: 0.1,
        armsEnabled: [1, 2, 3, 4],
      })
      // mock start combo, so it also does not reset the processing combo flag
      manager.startCombo = jest.fn()
      const time = manager.doCombo()
      await new Promise((r) => setTimeout(r, 1))
      expect(time).toBeGreaterThanOrEqual(3000)
      expect(time).toBeLessThanOrEqual(5000)
      manager.stopHits()
    })
  })
  describe('difficulty based hit speed in a combo', () => {
    it('should wait less time between hits when the difficulty is higher', async () => {
      const manager = new CombatManager({
        difficulty: 9,
        pauseDuration: 4,
        duration: 0.1,
        armsEnabled: [1, 2, 3, 4],
      })
      manager.processingCombo = true
      const p = manager.doHit({ arm: 1, nextArm: 2, asCombo: true })
      // pause for arm speed - 20 * 9 as we remove 20ms for every
      await new Promise((r) => setTimeout(r, armSpeed - 20 * 9))
      // the promise p should be resolved by now
      expect(util.inspect(p).includes('pending')).toBeFalsy()
    })

    it('should wait more time between hits when the difficulty is lower', async () => {
      const manager = new CombatManager({
        difficulty: 0,
        pauseDuration: 4,
        duration: 0.1,
        armsEnabled: [1, 2, 3, 4],
      })
      manager.processingCombo = true
      const p = manager.doHit({ arm: 1, nextArm: 2, asCombo: true })
      // pause for arm speed - 20 * 9 as we remove 20ms for every
      await new Promise((r) => setTimeout(r, armSpeed))
      // the promise p should be resolved by now
      expect(util.inspect(p).includes('pending')).toBeFalsy()
    })
  })
})
