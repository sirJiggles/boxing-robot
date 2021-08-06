import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-native-paper'
import { Layout } from '../../components/Layout'
import Constants from 'expo-constants'
import { AppConfig } from '../../types/AppConfig'

// import { SNSClient, AddPermissionCommand } from '@aws-sdk/client-sns';
// const client = new SNSClient({ region: 'eu-central-1' });
// const command = new AddPermissionCommand({
//   AWSAccountId: process.env.AWS_ACCOUNT_ID || '',
//   TopicArn: process.env.TOPIC_ARN || '',
// });

// as we cannot know the type of the manifest, we can define it in
// app config and just override the type, she is unknown if we don't
// know what is in the manifest
const config = Constants as unknown as AppConfig

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
            Send: {config.manifest.extra.boxingTopicArn}
          </Button>
        </Card.Content>
      </Card>
    </Layout>
  )
}
