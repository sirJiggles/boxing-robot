export const onMessage = (message: any) => {
  console.log(JSON.parse(message.Body).Message)
}
