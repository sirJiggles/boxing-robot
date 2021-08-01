import { Servo } from 'johnny-five'

export const testServo = () => {
  const servo = new Servo('GPIO18')

  const goTo0 = () => {
    servo.to(0)
    goTo180()
  }

  const goTo180 = () => {
    servo.to(180)
    setTimeout(goTo0, 1000)
  }

  servo.to(0)
  setTimeout(goTo180, 1000)

  return servo
}
