import React, { FunctionComponent } from 'react'
import { Chip } from 'react-native-paper'
import { Layout } from '../../components/Layout'
import { RobotState } from '../../types'
import { StyleSheet } from 'react-native'

import { useEvent } from '../../messaging/eventContext'
import { BashArms } from '../../components/BashArms'
import { Workout } from '../../components/Workout'

export const Home: FunctionComponent = () => {
  const { robotState } = useEvent()

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
        style={styles.chip}
        icon={icon()}
        disabled={robotState === RobotState.busy}
        selected={robotState === RobotState.ready}
      >
        {robotState}
      </Chip>
      <Workout />
      <BashArms />
    </Layout>
  )
}

const styles = StyleSheet.create({
  chip: {
    marginBottom: 20,
  },
})
