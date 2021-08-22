import React, { FunctionComponent } from 'react'
import { Select } from '../Select'
import { View, StyleSheet } from 'react-native'
import { Text, Subheading } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { theme } from '../Layout/theme'

type RangeInputProps = {
  title: string
  width: number
  onChange: (value: number) => void
  message?: string
  from: number
  to: number
  start: number
}

export const RangeInput: FunctionComponent<RangeInputProps> = ({
  width,
  title,
  onChange,
  message,
  from,
  to,
  start,
}) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Subheading style={styles.subHeading}>{t(title)}:</Subheading>
      {message ? <Text style={styles.message}>{t(message)}</Text> : null}
      <Select
        width={width}
        from={from}
        to={to}
        start={start}
        onValueChanged={(value) => onChange(value)}
      />
      <View style={styles.bottomBorder} />
    </View>
  )
}

const styles = StyleSheet.create({
  subHeading: {
    color: theme.colors.text,
  },
  bottomBorder: {
    borderColor: theme.colors.background,
    borderBottomWidth: 1,
  },
  container: {
    borderColor: theme.colors.onSurface,
    borderBottomWidth: 1,
  },
  message: {
    marginVertical: 5,
    color: theme.colors.text,
  },
})
