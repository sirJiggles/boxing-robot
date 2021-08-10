import program from './src/program'

// just run the program from the root file
const output = program()

// stack outputs
export const {
  queueForRobotToConsumeUrl,
  topicForRobotToPostToArn,
  region,
  secretAccessKey,
  accessKeyId,
  queueForAppToConsumeUrl,
  topicForAppToPostToArn,
} = output
