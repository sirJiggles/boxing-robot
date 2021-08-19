import React, { FunctionComponent, useState } from 'react'
import { Button, Card, TextInput } from 'react-native-paper'
import Constants from 'expo-constants'
import { AppConfig, RobotState } from '../../types'
import { View, StyleSheet } from 'react-native'

import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from '../../messaging/sns'
import { useEvent } from '../../messaging/eventContext'

const config = Constants as unknown as AppConfig
const { topicForAppToPostToArn } = config.manifest.extra

const stopWorkoutCommand = new PublishCommand({
  Message: 'stop',
  TopicArn: topicForAppToPostToArn,
})

export const Workout: FunctionComponent = () => {
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
  return (
    <Card style={styles.card}>
      <Card.Title title="Start a workout" />
      <Card.Content>
        <View style={styles.list}>
          <View style={styles.item}>
            <TextInput
              label="Duration (in mins)"
              value={duration}
              onChangeText={(text) => setDuration(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label="Difficulty (0-10)"
              value={difficulty}
              onChangeText={(text) => setDifficulty(text)}
            />
          </View>
          <View style={styles.item}>
            <Button
              contentStyle={styles.buttonContent}
              onPress={async () => {
                await snsClient.send(startWorkoutCommand)
              }}
              mode="contained"
              disabled={robotState === RobotState.busy}
            >
              Start workout
            </Button>
          </View>
          <View style={styles.item}>
            <Button
              contentStyle={styles.buttonContent}
              onPress={async () => {
                await snsClient.send(stopWorkoutCommand)
              }}
              disabled={
                robotState === RobotState.ready ||
                robotState === RobotState.starting
              }
              mode="contained"
            >
              Stop workout
            </Button>
          </View>
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
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
  },
  item: {
    width: '100%',
    paddingVertical: 20,
  },
})
