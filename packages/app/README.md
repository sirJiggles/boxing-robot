# What

This is just the app that is used to send events that the bot will listen too. This is done by sns + sqs

## Configuration

When building the app there is a node scripts that will get the stack output of the infra and pipe it as env vars to the expo scripts. This is not ideal as it uses relative paths to the infra package and it means you need to deploy the infra to get a new stack output before running the app. However it does mean you can manage all the secrets and get access to env vars like stack output arns really simply which is pretty awesome
.

Clear is required in the yarn scripts to clear the cache and make the env vars work ...
