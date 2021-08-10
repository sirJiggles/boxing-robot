import React, { useState } from 'react'
import { Home } from './src/pages/home'
import { EventProvider } from './src/messaging/eventContext'
import { RobotState } from './src/types'
import { pollForMessages } from './src/messaging/sqs'

// for now our app just has one page with some buttons and so on,
// noice and simple
export default function App() {
  const [robotState, setRobotState] = useState(RobotState.busy)

  const onMessage = (message: string) => {
    setRobotState(message as RobotState)
  }

  // just throw it for now
  const onError = (err: Error) => {
    throw err
  }

  // just start polling when the app is running and leave it on for now
  // we can pass this state in to our provider
  pollForMessages(onMessage, onError)

  return (
    <EventProvider
      value={{
        robotState,
      }}
    >
      <Home />
    </EventProvider>
  )
}
