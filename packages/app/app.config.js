import 'dotenv/config'

export default {
  name: 'Robo Bob',
  version: '1.0.0',
  android: {
    package: 'robot.boxer',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#000000',
    },
  },
  icon: './assets/images/icon.png',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#000000',
  },
  // our env vars can be stored here via dotenv, the inline babel plugin was not
  // working out, this seems a little nicer anyhow to have em in one place
  extra: {
    queueForRobotToConsumeUrl: process.env.queueForRobotToConsumeUrl,
    topicForRobotToPostToArn: process.env.topicForRobotToPostToArn,
    region: process.env.region,
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    queueForAppToConsumeUrl: process.env.queueForAppToConsumeUrl,
    topicForAppToPostToArn: process.env.topicForAppToPostToArn,
  },
}
