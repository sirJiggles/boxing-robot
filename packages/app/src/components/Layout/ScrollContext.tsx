import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent,
} from 'react'
import { StyleSheet, ScrollView } from 'react-native'

type ScrollContextValue = {
  scrollEnabled: boolean
  setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>> | undefined
}

const initialValue = {
  scrollEnabled: false,
  setScrollEnabled: undefined
} as ScrollContextValue

const ScrollContext = createContext(initialValue)

const useScrollContext = () => {
  return useContext(ScrollContext)
}

const ScrollProvider: FunctionComponent = ({ children }) => {
  // this is essentially why we have this component, so we can control on
  // children in a nice way when the top level scroll view has scroll
  // enabled or not
  const [scrollEnabled, setScrollEnabled] = useState(true)

  return (
    <ScrollContext.Provider value={{ scrollEnabled, setScrollEnabled }}>
      <ScrollView style={styles.scrollView} scrollEnabled={scrollEnabled}>
        {children}
      </ScrollView>
    </ScrollContext.Provider>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
})

export { ScrollProvider, useScrollContext }