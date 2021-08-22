import React, { FunctionComponent } from 'react'
import { RobotState } from '../../types'
import { Chip } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useEvent } from '../../messaging/eventContext'

export const RobotStateIndicator: FunctionComponent = () => {
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
    <Chip
      style={styles.chip}
      icon={icon()}
      disabled={robotState === RobotState.busy}
      selected={robotState === RobotState.ready}
    >
      {robotState}
    </Chip>
  )
}

const styles = StyleSheet.create({
  chip: {
    marginBottom: 20,
  },
})
