import { Servo } from 'johnny-five'

let arms: Servo[] = []

export const initArms = () => {
  arms = [
    new Servo('GPIO19'),
    new Servo('GPIO16'),
    new Servo('GPIO26'),
    new Servo('GPIO20'),
  ]
  return arms
}

// reset the arms if there is an error
export const resetArms = () => {
  arms.forEach((_, index) => {
    back(index)
  })
}

export const back = (arm: number) => {
  console.log(`arm ${arm} out`)
  arms[arm].to(0)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} in`)
  arms[arm].to(180)
}
