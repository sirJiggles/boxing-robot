import React from 'react'
import { Home } from './src/pages/home'
import { EventProvider } from './src/messaging/eventContext'
import { RobotState } from './src/types'

// for now our app just has one page with some buttons and so on,
// noice and simple
export default function App() {
  return (
    <EventProvider
      value={{
        robotState: RobotState.busy,
      }}
    >
      <Home />
    </EventProvider>
  )
}
