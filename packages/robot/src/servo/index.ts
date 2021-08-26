import { Servo } from 'johnny-five'

let arms: Servo[] = []
export const armSpeed = 700
const outAngle = 180
const inAngle = 50

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
  // calibrate the servos
  arms.forEach((arm) => arm.stop())
  return arms
}

// move all the arms back but stagger it to not get a surge
export const armsOut = async () => {
  let index = 0
  for (const arm of arms) {
    arm.stop()
    await back(index)
    index++
  }
}

// arms back in for the end of the workout
export const armsIn = async () => {
  let index = 0
  for (const arm of arms) {
    arm.stop()
    await out(index)
    index++
  }
}

export const back = (arm: number) => {
  console.log(`arm ${arm} back`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(outAngle)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(arm < 2 ? inAngle - 20 : inAngle)
}
