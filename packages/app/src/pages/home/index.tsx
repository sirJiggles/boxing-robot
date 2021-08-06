import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-native-paper'
import { Layout } from '../../components/Layout'
import Constants from 'expo-constants'
import { AppConfig } from '../../types/AppConfig'
import { View, StyleSheet } from 'react-native'

import { SNSClient, PublishCommand } from '@aws-sdk/client-sns'
// as we cannot know the type of the manifest, we can define it in
// app config and just override the type, she is unknown if we don't
// know what is in the manifest
const config = Constants as unknown as AppConfig
const { region, boxingTopicArn, accessKeyId, secretAccessKey } =
  config.manifest.env

const client = new SNSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})

// some commands to represent the servos for now
const commands = [
  new PublishCommand({
    Message: '1',
    TopicArn: boxingTopicArn,
  }),
  new PublishCommand({
    Message: '2',
    TopicArn: boxingTopicArn,
  }),
  new PublishCommand({
    Message: '3',
    TopicArn: boxingTopicArn,
  }),
  new PublishCommand({
    Message: '4',
    TopicArn: boxingTopicArn,
  }),
]

export const Home: FunctionComponent = () => {
  return (
    <Layout>
      <Card>
        <Card.Title title='Bash the arms' />
        <Card.Content>
          <View style={styles.list}>
            {commands.map((command, index) => {
              return (
                <View style={styles.item} key={`command${index}`}>
                  <Button
                    style={styles.button}
                    onPress={async () => {
                      const data = await client.send(command)
                      console.log(data)
                    }}
                    mode='contained'
                  >
                    {index + 1}
                  </Button>
                </View>
              )
            })}
          </View>
        </Card.Content>
      </Card>
    </Layout>
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    minHeight: 70,
    minWidth: 70,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  item: {
    width: '50%',
    padding: 20,
  },
})
