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

// move all the arms out but stagger it
export const resetArms = (arm = arms.length) => {
  back(arm - 1)
  setTimeout(() => {
    if (arm > 1) {
      resetArms(arm - 1)
    }
  }, 500)
}

export const back = (arm: number) => {
  console.log(`arm ${arm} in`)
  arms[arm].to(10)
}

export const out = (arm: number) => {
  console.log(`arm ${arm} extend`)
  arms[arm].to(170)
}
