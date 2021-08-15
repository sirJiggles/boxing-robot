import { Servo } from 'johnny-five'

let arms: Servo[] = []
export const armSpeed = 700
const outAngle = 180
const inAngle = 40


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
  return arms
}

// move all the arms back
export const armsOut = async () => {
  let index = 1
  for (const arm of arms) {
    arm.stop()
    index ++
    await back(index)
  }
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
}
