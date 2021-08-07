import { Servo } from 'johnny-five'

export const arms = [
  new Servo('GPIO19'),
  new Servo('GPIO16'),
  new Servo('GPIO26'),
  new Servo('GPIO20'),
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
