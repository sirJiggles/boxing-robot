export type AppConfig = {
  manifest: {
    name: string
    version: string
    env: {
      boxingTopicArn: string
      region: string
      accessKeyId: string
      secretAccessKey: string
    }
  }
}
