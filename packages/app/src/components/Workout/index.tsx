import React, { FunctionComponent, useState } from 'react'
import { Button, Card, TextInput, Text } from 'react-native-paper'
import Constants from 'expo-constants'
import { AppConfig, RobotState } from '../../types'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from '../../messaging/sns'
import { useEvent } from '../../messaging/eventContext'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

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
  const { t } = useTranslation()

  const startWorkoutCommand = new PublishCommand({
    Message: JSON.stringify({
      duration,
      difficulty,
    }),
    TopicArn: topicForAppToPostToArn,
  })
  return (
    <Card style={styles.card}>
      <Card.Title title={t('workout.title')} />
      <Card.Content>
        <View style={styles.list}>
          <View style={styles.item}>
            <TextInput
              label={t('workout.duration.label')}
              value={duration}
              onChangeText={(text) => setDuration(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label={t('workout.difficulty.label')}
              value={difficulty}
              onChangeText={(text) => setDifficulty(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              label={t('workout.pause_duration.label')}
              value={difficulty}
              onChangeText={(text) => setDifficulty(text)}
            />
            <MultiSlider min={0} max={10}  />
            <Text>
              {t('workout.pause_duration.description')}
            </Text>
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
              {t('workout.start')}
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
              {t('workout.stop')}
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
