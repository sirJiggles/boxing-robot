# What

This is just the app that is used to send events that the bot will listen too. This is done by sns + sqs

## Configuration

When running the app you can use commands like `yarn web` like any expo app. However you can also pass in STACK as an env var on the command line. This defaults to dev. It will take the stack output from pulumi, put that in an env file and the app will read from that env file for secrets. This means you need to `pulumi up` before trying to consume a secret. It needs to be in the stack output of the last run to be able to grab it basically.

### Why clear in the yarn scrips?

Clear is required in the yarn scripts to clear the cache and make the env vars work ...
