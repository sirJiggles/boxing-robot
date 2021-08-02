// this script is used to grab the env vars from the pulumi stack output
// then pass the needed configuration on to the front end when doing things
// like running and so on
const pulumi = require('@pulumi/pulumi')

console.log(pulumi)

const stack = new pulumi.StackReference('sirJiggles/boxing-robot/dev')
const topicArn = stack.getOutput('frontEndTopicArn')
const awsAccountId = stack.getOutput('awsAccountId')

// put the output from the stack on the console in a format for
// env args
console.log(`TOPIC_ARN=${topicArn} AWS_ACCOUNT_ID=${awsAccountId}`)
