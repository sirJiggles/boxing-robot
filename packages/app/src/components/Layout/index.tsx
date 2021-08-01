import React, { FunctionComponent, ReactNode } from 'react'
// import 'braid-design-system/reset'
import jobStreetTheme from 'braid-design-system/themes/jobStreet'
import { BraidProvider } from 'braid-design-system'
import { StyleSheet, SafeAreaView, ScrollView, StatusBar } from 'react-native'

type LayoutProps = {
  children: ReactNode
}

export const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  return (
    <BraidProvider theme={jobStreetTheme}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>{children}</ScrollView>
      </SafeAreaView>
    </BraidProvider>
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
