import { createContext, useContext } from 'react'
import { RobotState } from '../types'

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
