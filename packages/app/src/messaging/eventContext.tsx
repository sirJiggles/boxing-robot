import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent,
} from 'react'
import { pollForMessages } from './sqs'
import { RobotState } from '../types'

const useEvent = () => {
  return useContext(EventContext)
}

const EventContext = createContext({ robotState: RobotState.busy })

const EventProvider: FunctionComponent = ({ children }) => {
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
    <EventContext.Provider value={{ robotState }}>
      {children}
    </EventContext.Provider>
  )
}

export { EventProvider, useEvent }
