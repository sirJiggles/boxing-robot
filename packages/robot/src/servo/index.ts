import { Servo } from 'johnny-five'
import { setTimeout, setInterval } from 'timers'

let arms: Servo[] = []
let backRecoveryInterval: NodeJS.Timer
const armMovingOut = [false, false, false, false]
export const armSpeed = 450
const outAngle =  80
const inAngle = 140

const startBackRecovery = () => {
  clearInterval(backRecoveryInterval)
  backRecoveryInterval = setInterval(() => {
    arms.forEach((arm, index) => {
      if (!armMovingOut[index] && arm.position > outAngle) {
        console.log(`arm ${index} stuck, recovering it`)
        back(index)
      }
    })
  }, armSpeed)
}

export const initArms = () => {
  const options = {
    startAt: outAngle,
  }
  arms = [
    new Servo({ pin: 'GPIO19', ...options }),
    new Servo({ pin: 'GPIO16', ...options }),
    new Servo({ pin: 'GPIO26', ...options }),
    new Servo({ pin: 'GPIO20', ...options }),
  ]
  // calabrate the servos
  arms.forEach((arm) => arm.stop())
  // startBackRecovery()
  return arms
}

// move all the arms back
export const armsOut = () => {
  arms.forEach((arm, index) => {
    arm.stop()
    back(index)
  })
}



export const back = (arm: number) => {
  console.log(`arm ${arm} back`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(outAngle, armSpeed)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(inAngle, armSpeed)

  // mark this arm is going out and should be pulled back if it gets stuck
  armMovingOut[arm] = true
  setTimeout(() => {
    armMovingOut[arm] = false
  }, armSpeed + 100)
}
