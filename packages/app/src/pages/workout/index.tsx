import React, { FunctionComponent } from 'react'

import { Workout } from '../../components/Workout'
import { RobotStateIndicator } from '../../components/BotState'
import { Layout } from '../../components/Layout'

export const WorkoutPage: FunctionComponent = () => {
  return (
    <Layout>
      <RobotStateIndicator />
      <Workout />
    </Layout>
  )
}
