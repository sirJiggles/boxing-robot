import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-native-paper'
import { Layout } from '../../components/Layout'
import Constants from 'expo-constants'
import { AppConfig } from '../../types/AppConfig'

import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
// as we cannot know the type of the manifest, we can define it in
// app config and just override the type, she is unknown if we don't
// know what is in the manifest
const config = Constants as unknown as AppConfig
const { region, boxingTopicArn, accessKeyId, secretAccessKey } =
  config.manifest.env

console.log(accessKeyId, secretAccessKey, region, boxingTopicArn)

const client = new SNSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

const command = new PublishCommand({
  Message: 'this is a sample message',
  TopicArn: boxingTopicArn,
})

export const Home: FunctionComponent = () => {
  return (
    <Layout>
      <Card>
        <Card.Title title='Start a workout' />
        <Card.Content>
          <Button
            onPress={async () => {
              try {
                const data = await client.send(command)
                console.log(data)
              } catch (err) {
                throw new Error(err)
              }
              alert('you pressed me!')
            }}
            mode='contained'
            icon='send-circle'
          >
            Send
          </Button>
        </Card.Content>
      </Card>
    </Layout>
  )
}
