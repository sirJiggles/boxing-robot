// this script is used to grab the env vars from the pulumi stack output
// then pass the needed configuration on to the front end when doing things
// like running and so on
const exposedInfra = require('@boxing-robot/infra/src/expose');

// get a handle to the stack
const stack = exposedInfra.getStack('dev');

// get the things we care about, out the stack
const topicArn = stack.getOutput('frontEndTopicArn');
const thing = stack.getOutput('thing');

// put the output from the stack on the console in a format for
// env args
console.log(`TOPIC_ARN=${topicArn} AWS_ACCOUNT_ID=${awsAccountId}`);
