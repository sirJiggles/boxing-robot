// needed for sqs / sns in the app
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'

import React from 'react'
import { Home } from './src/pages/home'
import { EventProvider } from './src/messaging/eventContext'

// for now our app just has one page with some buttons and so on,
// noice and simple
export default function App() {
  return (
    <EventProvider>
      <Home />
    </EventProvider>
  )
}
