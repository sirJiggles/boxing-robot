import { Servo } from 'johnny-five'

let arms: Servo[] = []

export const initArms = () => {
  const options = {
    startAt: 0,
    fps: 100,
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
export const resetArms = (arm = arms.length) => {
  arms.forEach((arm) => {
    arm.stop()
    arm.min()
  })
  // back(arm - 1)
  // setTimeout(() => {
  //   if (arm > 1) {
  //     resetArms(arm - 1)
  //   }
  // }, 500)
}

export const back = (arm: number) => {
  console.log(`arm ${arm} back`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(0, 500)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(180, 500)
}
