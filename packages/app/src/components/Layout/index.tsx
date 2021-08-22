import React, { FunctionComponent, ReactNode } from 'react'
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { theme } from './theme'

type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
})
