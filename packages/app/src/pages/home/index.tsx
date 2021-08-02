import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-native-paper'
import { Layout } from '../../components/Layout'

import { SNSClient, AddPermissionCommand } from '@aws-sdk/client-sns'
const client = new SNSClient({ region: 'eu-central-1' })
const command = new AddPermissionCommand({
  AWSAccountId: process.env.AWS_ACCOUNT_ID || '',
  TopicArn: process.env.TOPIC_ARN || '',
})

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
