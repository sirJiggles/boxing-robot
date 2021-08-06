import { Servo } from 'johnny-five'

export const arms = [
  new Servo('GPIO10'),
  new Servo('GPIO11'),
  new Servo('GPIO12'),
  new Servo('GPIO13'),
]

// reset the arms if there is an error
export const resetArms = () => {
  arms.forEach((arm) => {
    back(arm)
  })
}

export const back = (arm: Servo) => {
  arm.to(180)
}

export const out = (arm: Servo) => {
  arm.to(0)
}
