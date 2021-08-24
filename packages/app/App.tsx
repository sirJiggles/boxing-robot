// needed for sqs / sns in the app
import 'react-native-get-random-values'
import 'react-native-url-polyfill/auto'

import React from 'react'
import { EventProvider } from './src/messaging/eventContext'
import { Navigation } from './src/components/Navigation'
import { Provider as PaperProvider } from 'react-native-paper'
import { theme } from './src/components/Layout/theme'
import { I18nextProvider } from 'react-i18next'
import i18n from './src/i18n'

// for now our app just has one page with some buttons and so on,
// noice and simple
export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <EventProvider>
        <PaperProvider theme={theme}>
          <Navigation />
        </PaperProvider>
      </EventProvider>
    </I18nextProvider>
  )
}
