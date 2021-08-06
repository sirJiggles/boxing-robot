export type Config = {
  region: string
  accessKeyId: string
  secretAccessKey: string
  queueUrl: string
}

export type MessagePayload = {
  Body: string
}

export type MessageBody = {
  Message: string
}
