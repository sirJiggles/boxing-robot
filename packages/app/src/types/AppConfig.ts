export type AppConfig = {
  manifest: {
    name: string
    version: string
    extra: {
      boxingTopicArn: string
      region: string
      accessKeyId: string
      secretAccessKey: string
    }
  }
}
