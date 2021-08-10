import React, { FunctionComponent, useState } from 'react'
import { Button, Card, TextInput, Chip } from 'react-native-paper'
import { Layout } from '../../components/Layout'
import Constants from 'expo-constants'
import { AppConfig, RobotState } from '../../types'
import { View, StyleSheet } from 'react-native'

import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from '../../messaging/sns'
import { useEvent } from '../../messaging/eventContext'
// as we cannot know the type of the manifest, we can define it in
// app config and just override the type, she is unknown if we don't
// know what is in the manifest
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

const stopWorkoutCommand = new PublishCommand({
  Message: 'stop',
  TopicArn: topicForAppToPostToArn,
})

export const Home: FunctionComponent = () => {
  const [duration, setDuration] = useState('30')
  const [difficulty, setDifficulty] = useState('10')
  const { robotState } = useEvent()

  const startWorkoutCommand = new PublishCommand({
    Message: JSON.stringify({
      duration,
      difficulty,
    }),
    TopicArn: topicForAppToPostToArn,
  })

  const icon = () => {
    switch (robotState) {
      case RobotState.busy:
        return 'close'
      case RobotState.ready:
        return 'check'
      case RobotState.starting:
        return 'information'
    }
  }

  return (
    <Layout>
      <Chip
        style={styles.card}
        icon={icon()}
        disabled={robotState === RobotState.busy}
        selected={robotState === RobotState.ready}
      >
        {robotState}
      </Chip>
      <Card style={styles.card}>
        <Card.Title title='Start a workout' />
        <Card.Content>
          <View style={styles.swlist}>
            <View style={styles.switem}>
              <TextInput
                label='Duration (in mins)'
                value={duration}
                onChangeText={(text) => setDuration(text)}
              />
            </View>
            <View style={styles.switem}>
              <TextInput
                label='Difficulty (0-10)'
                value={difficulty}
                onChangeText={(text) => setDifficulty(text)}
              />
            </View>
            <View style={styles.switem}>
              <Button
                style={styles.button}
                onPress={async () => {
                  await snsClient.send(startWorkoutCommand)
                }}
                mode='contained'
              >
                Start workout
              </Button>
            </View>
            <View style={styles.switem}>
              <Button
                style={styles.button}
                onPress={async () => {
                  await snsClient.send(stopWorkoutCommand)
                }}
                mode='contained'
              >
                Stop workout
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
      <Card style={styles.card}>
        <Card.Title title='Bash the arms' />
        <Card.Content>
          <View style={styles.list}>
            {commands.map((command, index) => {
              return (
                <View style={styles.item} key={`command${index}`}>
                  <Button
                    style={styles.button}
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
    </Layout>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
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
  swlist: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
  },
  switem: {
    width: '100%',
    paddingVertical: 20,
  },
})
