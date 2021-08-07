import 'dotenv/config'

export default {
  name: 'Boxing App mobile app',
  version: '1.0.0',
  // our env vars can be stored here via dotenv, the inline babel plugin was not
  // working out, this seems a little nicer anyhow to have em in one place
  env: {
    boxingTopicArn: process.env.boxingTopicArn,
    region: process.env.region,
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
  },
}