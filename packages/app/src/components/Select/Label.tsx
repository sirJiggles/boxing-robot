import React, { FunctionComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { theme } from '../Layout/theme'

const width = 40

type LabelProps = {
  oneMarkerValue: string | number
  twoMarkerValue: string | number
  oneMarkerLeftPosition: number
  twoMarkerLeftPosition: number
  oneMarkerPressed: boolean
  twoMarkerPressed: boolean
}

export const Label: FunctionComponent<LabelProps> = ({
  oneMarkerValue,
  twoMarkerValue,
  oneMarkerLeftPosition,
  twoMarkerLeftPosition,
  oneMarkerPressed,
  twoMarkerPressed,
}) => {
  return (
    <View style={{ position: 'relative' }}>
      {Number.isFinite(oneMarkerLeftPosition) &&
        Number.isFinite(oneMarkerValue) && (
          <View
            style={[
              styles.sliderLabel,
              { left: oneMarkerLeftPosition - width / 2 },
              oneMarkerPressed && styles.markerPressed,
            ]}
          >
            <Text style={styles.sliderLabelText}>{oneMarkerValue}</Text>
          </View>
        )}

      {Number.isFinite(twoMarkerLeftPosition) &&
        Number.isFinite(twoMarkerValue) && (
          <View
            style={[
              styles.sliderLabel,
              { left: twoMarkerLeftPosition - width / 2 },
              twoMarkerPressed && styles.markerPressed,
            ]}
          >
            <Text style={styles.sliderLabelText}>{twoMarkerValue}</Text>
          </View>
        )}
    </View>
  )
}

const styles = StyleSheet.create({
  sliderLabel: {
    position: 'absolute',
    bottom: -2,
    minWidth: width,
    padding: 8,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
  },
  sliderLabelText: {
    alignItems: 'center',
    textAlign: 'center',
    fontStyle: 'normal',
    fontSize: 11,
    color: theme.colors.surface,
  },
  markerPressed: {},
})
