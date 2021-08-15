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
  // calabrate the servos
  arms.forEach((arm) => arm.stop())
  return arms
}

// move all the arms back
export const armsOut = async () => {
  let index = 0
  for (const arm of arms) {
    arm.stop()
    await back(index)
    index ++
  }
}

export const back = (arm: number) => {
  console.log(`arm ${arm} back`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  if (arm < 2 ) {
    servo.to(outAngle - 80, armSpeed - 300)
    return
  } 
  servo.to(outAngle, armSpeed)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  if (arm < 2) {
    servo.to(inAngle - 20, armSpeed - 300)
    return
  }
  servo.to(inAngle, armSpeed)
}
