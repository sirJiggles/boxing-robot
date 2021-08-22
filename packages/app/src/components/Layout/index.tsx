import React, { FunctionComponent, ReactNode } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import { ScrollProvider } from './ScrollContext'
import { theme } from './theme'

type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollProvider>{children}</ScrollProvider>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.background,
  },
})
