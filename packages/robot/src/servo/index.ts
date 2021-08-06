import { Servo } from 'johnny-five'

export const arms = [
  new Servo('GPIO10'),
  new Servo('GPIO11'),
  new Servo('GPIO12'),
  new Servo('GPIO13'),
]

// reset the arms if there is an error
export const resetArms = () => {
  arms.forEach((_, index) => {
    back(index)
  })
}

export const back = (arm: number) => {
  console.log(`arm ${arm} out`)
  arms[arm].to(180)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} in`)
  arms[arm].to(180)
}
