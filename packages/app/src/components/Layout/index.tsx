import React, { FunctionComponent, ReactNode } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { theme } from './theme'

type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>{children}</ScrollView>
      </SafeAreaView>
    </PaperProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
})
