import { createContext, useContext } from 'react'
import { pollForMessages } from './sqs'
import { RobotState } from '../types'

// just start polling when the app is running and leave it on for now
// we can pass this state in to our provider maybe in a better way soon
// maybe in the actual provider I should think
const dynamicState = pollForMessages()

// what sort of state changes will happen on events
const state = {
  robotState: RobotState.busy,
}

const EventContext = createContext(state)
const EventProvider = EventContext.Provider

const useEvent = () => {
  return useContext(EventContext)
}
export { EventProvider, useEvent }
