import { Servo } from 'johnny-five'

let arms: Servo[] = []
// 500 is the arm speed as for every increment of difficulty 
// we shave of 20ms and there are ten max difficulty
// so we can go as fast as 300 when it is 500 as 200ms can be taken
// off by making it go faster in the settings
export const armSpeed = 500

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
