import React, { FunctionComponent } from 'react'
import { Select } from '../Select'
import { View } from 'react-native'
import { Text, Subheading } from 'react-native-paper'
import { useTranslation } from 'react-i18next'

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
    <View>
      <Subheading>{t(title)}</Subheading>
      <Select
        width={width}
        from={from}
        to={to}
        start={start}
        onValueChanged={(value) => onChange(value)}
      />
      {message ? <Text>{t(message)}</Text> : null}
    </View>
  )
}
