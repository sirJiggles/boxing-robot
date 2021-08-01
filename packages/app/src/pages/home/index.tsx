import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-native-paper'
import { Layout } from '../../components/Layout'

export const Home: FunctionComponent = () => {
  return (
    <Layout>
      <Card>
        <Card.Title title='Start a workout' />
        <Card.Content>
          <Button
            onPress={() => {
              alert('you pressed me!')
            }}
            mode='contained'
            icon='send-circle'
          >
            Send event
          </Button>
        </Card.Content>
      </Card>
    </Layout>
  )
}
