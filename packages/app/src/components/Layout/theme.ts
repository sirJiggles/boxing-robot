import { DefaultTheme } from 'react-native-paper'
import { Theme } from 'react-native-paper/lib/typescript/types'

export const theme: Theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 10,
  colors: {
    background: '#1b1f2b',
    primary: '#fc370f',
    accent: '#f5f0f0',
    // @TODO this one
    backdrop: 'pink',
    surface: '#2f364a',
    text: '#f5f0f0',
    onSurface: 'pink',
    placeholder: '#aaa',
    // @TODO and this one
    notification: 'green',
    disabled: '#f5f0f0',
    error: '#28303d',
  },
}
