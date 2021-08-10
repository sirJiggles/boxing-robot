import { SNSClient } from '@aws-sdk/client-sns'
import { AppConfig } from '../types'
import Constants from 'expo-constants'

const config = Constants as unknown as AppConfig
const { region, accessKeyId, secretAccessKey } = config.manifest.extra

export const snsClient = new SNSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})
