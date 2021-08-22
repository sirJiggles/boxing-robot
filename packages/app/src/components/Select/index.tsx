import React, { FunctionComponent } from 'react'
import { View } from 'react-native'
import { useScrollContext } from '../Layout/ScrollContext'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import { theme } from '../../components/Layout/theme'
import { Label } from './Label'

type SelectArgs = {
  width: number
  onValueChanged: (value: number) => void
  from: number
  to: number
  start: number
}

export const Select: FunctionComponent<SelectArgs> = ({
  width,
  onValueChanged,
  from,
  to,
  start,
}) => {
  const { setScrollEnabled } = useScrollContext()
  return (
    <View
      style={{
        marginTop: 30,
      }}
    >
      <MultiSlider
        min={from}
        max={to}
        values={[start]}
        snapped
        trackStyle={{
          backgroundColor: theme.colors.placeholder,
        }}
        selectedStyle={{
          backgroundColor: theme.colors.primary,
        }}
        enableLabel
        allowOverlap
        sliderLength={width - 40}
        onValuesChangeStart={() => {
          setScrollEnabled?.(false)
        }}
        onValuesChangeFinish={(value) => {
          // call the func passed in for value changed
          onValueChanged(value[0])
          // re-enable scroll if in a scroll view
          setScrollEnabled?.(true)
        }}
        customLabel={Label}
      />
    </View>
  )
}
