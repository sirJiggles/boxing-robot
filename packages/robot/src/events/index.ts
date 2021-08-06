import { resetArms } from '../servo'

export const onMessage = (message: any) => {
  console.log(JSON.parse(message.Body).Message)
}

export const onError = () => {
  resetArms()
}
