// needed for sqs / sns in the app
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'

import React from 'react'
import { EventProvider } from './src/messaging/eventContext'
import { Navigation } from './src/components/Navigation'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './src/components/Layout/theme'

// for now our app just has one page with some buttons and so on,
// noice and simple
export default function App() {
  return (
    <EventProvider>
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>
    </EventProvider>
  )
}
