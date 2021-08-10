import { SNSClient } from '@aws-sdk/client-sns'
import { Config } from '../types'

// grab the things we need of the env to configure the client
const { region, accessKeyId, secretAccessKey } = process.env as Config

// the sns client to post our events too
export const snsClient = new SNSClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
})
