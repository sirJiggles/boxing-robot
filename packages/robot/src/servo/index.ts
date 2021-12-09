import { Servo } from 'johnny-five'

let arms: Servo[] = []
// the fastest we want the servo to go
export const armSpeed = 250

// in and outs for each arm
// all right now have the same diff of deg change
const armDegreesOut = [90, 90, 100, 80]
const armDegreesHit = [50, 130, 55, 120]

export const initArms = () => {
  arms = [
    new Servo({ pin: 'GPIO19', startAt: armDegreesOut[0] }),
    new Servo({ pin: 'GPIO16', startAt: armDegreesOut[1] }),
    new Servo({ pin: 'GPIO26', startAt: armDegreesOut[2] }),
    new Servo({ pin: 'GPIO20', startAt: armDegreesOut[3] }),
  ]
  // calibrate the servos
  arms.forEach((arm) => arm.stop())
  return arms
}

export const back = (arm: number, speed: number) => {
  console.log(`arm ${arm} back`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(armDegreesOut[arm], speed)
}

export const out = (arm: number, speed: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(armDegreesHit[arm], speed)
}

export const armsIn = async () => {
  let index = 0
  for (const arm of arms) {
    arm.stop()
    await out(index, 500)
    index++
  }
}
