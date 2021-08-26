import React, { FunctionComponent } from 'react'
import { Button } from 'react-native-paper'
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

export const Remote: FunctionComponent = () => {
  return (
    <View style={styles.list}>
      <View style={styles.inner}>
        <Image
          source={require('../../../assets/images/bob.png')}
          style={styles.bobImage}
          resizeMode="contain"
        />
        {commands.map((command, index) => {
          return (
            // @ts-ignore
            <View style={styles[`button${index}`]} key={`command${index}`}>
              <Button
                contentStyle={styles.buttonContent}
                onPress={async () => {
                  const data = await snsClient.send(command)
                  console.log(data)
                }}
                mode="contained"
              >
                {index + 1}
              </Button>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContent: {
    minHeight: 70,
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',

    justifyContent: 'center',
  },
  inner: {
    position: 'relative',
    width: 370,
  },
  button0: {
    top: 140,
    left: 50,
    position: 'absolute',
  },
  button1: {
    top: 140,
    right: 50,
    position: 'absolute',
  },
  button2: {
    top: 220,
    left: 0,
    position: 'absolute',
  },
  button3: {
    top: 220,
    right: 0,
    position: 'absolute',
  },
  bobImage: {
    width: '100%',
    height: 600,
  },
})
