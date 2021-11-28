import { Servo } from 'johnny-five'

let arms: Servo[] = []
export const armSpeed = 300

// in and outs for each arm
// all right now have the same diff of deg change
const armDegreesOut = [100, 90, 100, 80]
const armDegreesHit = [60, 130, 60, 120]

export const initArms = () => {
  arms = [
    new Servo({ pin: 'GPIO19', 
      startAt: armDegreesOut[0]
    }),
    new Servo({ pin: 'GPIO16', 
      startAt: armDegreesOut[1]
    }),
    new Servo({ pin: 'GPIO26', 
      startAt: armDegreesOut[2]
    }),
    new Servo({ pin: 'GPIO20', 
      startAt: armDegreesOut[3]
    }),
  ]
  // calibrate the servos
  arms.forEach((arm) => arm.stop())
  return arms
}

// move all the arms back but stagger it to not get a surge
export const armsOut = async () => {
  return
  let index = 0
  for (const arm of arms) {
    arm.stop()
    await back(index)
    index++
  }
}

// arms back in for the end of the workout
export const armsIn = async () => {
  return
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
  servo.to(armDegreesOut[arm])
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  const servo = arms[arm]
  if (servo.isMoving) {
    servo.stop()
  }
  servo.to(armDegreesHit[arm])
}
