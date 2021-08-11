import { Servo } from 'johnny-five'
import { setTimeout, setInterval } from 'timers'

let arms: Servo[] = []
let backRecoveryInterval: NodeJS.Timer
const armsExtended = [false, false, false, false]
export const armSpeed = 400
const outAngle =  80
const inAngle = 140

const startBackRecovery = () => {
  clearInterval(backRecoveryInterval)
  backRecoveryInterval = setInterval(() => {
    arms.forEach((arm, index) => {
      if (armsExtended[index] && arm.position > outAngle) {
        console.log(`arm ${index} stuck, recovering it`)
        arm.stop()
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
  startBackRecovery()
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
  // this arm should no longer be extended
  setTimeout(() => {
    armsExtended[arm] = false
  }, armSpeed)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(inAngle, armSpeed)
  setTimeout(() => {
    armsExtended[arm] = true
  }, armSpeed)
}
