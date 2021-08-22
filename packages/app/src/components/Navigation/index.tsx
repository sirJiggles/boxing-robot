import React, { FunctionComponent, useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import { WorkoutPage } from '../../pages/workout'
import { ArmsPage } from '../../pages/arms'

export const Navigation: FunctionComponent = () => {
  const [index, setIndex] = useState(0)
  const [routes] = React.useState([
    { key: 'workout', title: 'Workout', icon: 'boxing-glove' },
    { key: 'remote', title: 'Remote', icon: 'remote' },
  ])

  const renderScene = BottomNavigation.SceneMap({
    workout: WorkoutPage,
    remote: ArmsPage,
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  )
}
