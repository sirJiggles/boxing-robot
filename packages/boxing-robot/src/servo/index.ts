import { Servo } from 'johnny-five'


export const testServo = () => {
    const servo = new Servo(10)

    const goTo90 = () => {
        servo.to(90)
        setTimeout(goTo0, 2000)
    }

    const goTo0 = () => {
        servo.to(0)
        setTimeout(goTo90, 2000)
    }

    servo.to(0)
    setTimeout(goTo90, 1000)
}