import React, { FunctionComponent, useState } from 'react'
import { BottomNavigation } from 'react-native-paper'
import { WorkoutPage } from '../../pages/workout'
import { ArmsPage } from '../../pages/arms'
import { useTranslation } from 'react-i18next'

export const Navigation: FunctionComponent = () => {
  const [index, setIndex] = useState(0)
  const { t } = useTranslation()
  const [routes] = React.useState([
    { key: 'workout', title: t('navigation.workout'), icon: 'boxing-glove' },
    { key: 'remote', title: t('navigation.remote'), icon: 'remote' },
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
      shifting
    />
  )
}
