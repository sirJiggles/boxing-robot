import { DefaultTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper/lib/typescript/types'

export const theme: Theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    background: '#1b1f2b',
    primary: '#ff370a',
    accent: '#ff370a',
    // @TODO this one
    backdrop: 'pink',
    surface: '#2f364a',
    text: '#f5f0f0',
    onSurface: '#28303d',
    placeholder: '#28303d',
    // @TODO and this one
    notification: 'green',
    disabled: '#f5f0f0',
    error: '#28303d',
  },
}
