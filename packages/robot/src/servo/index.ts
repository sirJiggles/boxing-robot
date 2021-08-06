import { Servo } from 'johnny-five'

export const arms = () => {
  return [
    new Servo('GPIO10'),
    new Servo('GPIO11'),
    new Servo('GPIO12'),
    new Servo('GPIO13'),
  ]
}

export const back = (arm: Servo) => {
  arm.to(180)
}

export const out = (arm: Servo) => {
  arm.to(0)
}
