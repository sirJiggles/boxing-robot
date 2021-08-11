import { Servo } from 'johnny-five'
import { setTimeout } from 'timers'

let arms: Servo[] = []
export const armSpeed = 700

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
export const armsOut = () => {
  arms.forEach((arm, index) => {
    arm.stop()
    back(index)
  })
}

export const armsIn = () => {
  arms.forEach((arm, index) => {
    arm.stop()
    out(index)
  })
}

export const back = (arm: number) => {
  console.log(`arm ${arm} back`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(0, armSpeed)
  // if the arm is still not back send the signal again to send it back
  setTimeout(() => {
    console.log(`arm position ${servo.position}`)
    if (servo.position > 170) {
      console.log('arm is stuck, trying again')
      back(arm)
    }
  }, 200)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(180, armSpeed)
}
