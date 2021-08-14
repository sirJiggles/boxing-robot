import React, { FunctionComponent } from 'react'
import { Button, Card } from 'react-native-paper'
import Constants from 'expo-constants'
import { AppConfig } from '../../types'
import { View, StyleSheet, Image } from 'react-native'

import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from '../../messaging/sns'

const config = Constants as unknown as AppConfig
const { topicForAppToPostToArn } = config.manifest.extra

// some commands to represent the servos for now
const commands = [
  new PublishCommand({
    Message: '1',
    TopicArn: topicForAppToPostToArn,
  }),
  new PublishCommand({
    Message: '2',
    TopicArn: topicForAppToPostToArn,
  }),
  new PublishCommand({
    Message: '3',
    TopicArn: topicForAppToPostToArn,
  }),
  new PublishCommand({
    Message: '4',
    TopicArn: topicForAppToPostToArn,
  }),
]

export const BashArms: FunctionComponent = () => {
  return (
    <Card style={styles.card}>
      <Card.Title title='Bash the arms' />
      <Card.Content>
        <View style={styles.list}>
          <Image
            source={require('../../../assets/images/bob.png')}
            style={styles.bobImage}
            resizeMode='contain'
          />
          {commands.map((command, index) => {
            return (
              <View style={styles.item} key={`command${index}`}>
                <Button
                  contentStyle={styles.buttonContent}
                  onPress={async () => {
                    const data = await snsClient.send(command)
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
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  buttonContent: {
    minHeight: 70,
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
  bobImage: {
    width: '100%',
    height: 600,
    backgroundColor: 'transparent',
  },
})
