export type Config = {
  robotQueueUrl: string
  topicForRobotToPostToArn: string
  region: string
  secretAccessKey: string
  accessKeyId: string
  queueForAppToConsumeUrl: string
  topicForAppToPostToArn: string
}

export type MessagePayload = {
  Body: string
}

export type MessageBody = {
  Message: string
}

export type WorkoutConfig = {
  duration: number
  difficulty: number
}

export enum Message {
  starting = 'starting',
  busy = 'busy',
  ready = 'ready',
  stopWorkout = 'stop',
}
