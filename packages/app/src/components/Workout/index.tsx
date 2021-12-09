import React, { FunctionComponent, useState } from 'react'
import { Button, Card, Checkbox } from 'react-native-paper'
import Constants from 'expo-constants'
import { AppConfig } from '../../types'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { PublishCommand } from '@aws-sdk/client-sns'
import { snsClient } from '../../messaging/sns'
import { RangeInput } from './RangeInput'

const config = Constants as unknown as AppConfig
const { topicForAppToPostToArn } = config.manifest.extra

const stopWorkoutCommand = new PublishCommand({
  Message: 'stop',
  TopicArn: topicForAppToPostToArn,
})

export const Workout: FunctionComponent = () => {
  const [duration, setDuration] = useState(30)
  const [difficulty, setDifficulty] = useState(10)
  const [pauseDuration, setPauseDuration] = useState(5)
  const [width, setWidth] = useState(0)
  const [armOne, setArmOne] = useState(true)
  const [armTwo, setArmTwo] = useState(true)
  const [armThree, setArmThree] = useState(true)
  const [armFour, setArmFour] = useState(true)

  const { t } = useTranslation()

  return (
    <View
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout
        setWidth(width)
      }}
    >
      <Card style={styles.card}>
        <Card.Title title={t('workout.title')} />
        <Card.Content>
          <View style={styles.list}>
            <View style={styles.item}>
              <RangeInput
                width={width}
                title="workout.duration.label"
                onChange={setDuration}
                from={0}
                to={120}
                start={30}
              />
            </View>
            <View style={styles.item}>
              <RangeInput
                width={width}
                title="workout.difficulty.label"
                message="workout.difficulty.description"
                onChange={setDifficulty}
                from={0}
                to={10}
                start={6}
              />
            </View>
            <View style={styles.item}>
              <RangeInput
                width={width}
                title="workout.pause_duration.label"
                onChange={setPauseDuration}
                message="workout.pause_duration.description"
                from={0}
                to={10}
                start={3}
              />
            </View>
            <View style={styles.item}>
              <Checkbox.Item
                label={`${t('workout.arms.enable')}: 1`}
                onPress={() => setArmOne(!armOne)}
                status={armOne ? 'checked' : 'unchecked'}
              />
              <Checkbox.Item
                label={`${t('workout.arms.enable')}: 2`}
                onPress={() => setArmTwo(!armTwo)}
                status={armTwo ? 'checked' : 'unchecked'}
              />
              <Checkbox.Item
                label={`${t('workout.arms.enable')}: 3`}
                onPress={() => setArmThree(!armThree)}
                status={armThree ? 'checked' : 'unchecked'}
              />
              <Checkbox.Item
                label={`${t('workout.arms.enable')}: 4`}
                onPress={() => setArmFour(!armFour)}
                status={armFour ? 'checked' : 'unchecked'}
              />
            </View>
            <View style={styles.item}>
              <Button
                contentStyle={styles.buttonContent}
                onPress={async () => {
                  await snsClient.send(
                    new PublishCommand({
                      Message: JSON.stringify({
                        duration,
                        difficulty,
                        pauseDuration,
                        armOne,
                        armTwo,
                        armThree,
                        armFour,
                      }),
                      TopicArn: topicForAppToPostToArn,
                    })
                  )
                }}
                mode="contained"
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
                mode="outlined"
              >
                {t('workout.stop')}
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  buttonContent: {
    minHeight: 50,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    width: '100%',
  },
  item: {
    width: '100%',
    paddingVertical: 10,
  },
})
