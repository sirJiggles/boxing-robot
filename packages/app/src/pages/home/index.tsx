import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import { Layout } from '../../components/Layout'

export const Home: FunctionComponent = () => {
  return (
    <Layout>
      <View style={styles.buttonWrapper}>
        <Button
          onPress={() => {
            alert('you pressed me!')
          }}
          mode='contained'
          icon='send-circle'
        >
          Click me baby!
        </Button>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    height: '20px',
  },
})
