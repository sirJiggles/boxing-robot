export type AppConfig = {
  manifest: {
    name: string
    version: string
    extra: {
      queueForRobotToConsumeUrl: string
      topicForRobotToPostToArn: string
      region: string
      secretAccessKey: string
      accessKeyId: string
      queueForAppToConsumeUrl: string
      topicForAppToPostToArn: string
    }
  }
}

export enum RobotState {
  busy = 'busy',
  ready = 'ready',
  starting = 'starting',
}
