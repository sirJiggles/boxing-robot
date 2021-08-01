import React, { FunctionComponent } from 'react'
import { View, StyleSheet } from 'react-native'
import { Layout } from '../../components/Layout'
import { Button, Text } from 'braid-design-system'

export const Home: FunctionComponent = () => {
  return (
    <Layout>
      <View style={styles.buttonWrapper}>
        <Button
          onClick={() => {
            alert('you pressed me!')
          }}
        >
          <Text>Click me baby</Text>
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
