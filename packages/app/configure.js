// this script is used to grab the env vars from the pulumi stack output
// then pass the needed configuration on to the front end when doing things
// like running and so on
// const exposedInfra = require('@boxing-robot/infra/src/expose');

import { execSync } from 'child_process'
import fs from 'fs'

const stack = process.env.STACK || 'dev'

const stackOutput = JSON.parse(
  execSync(`pulumi stack output --cwd ../infra --stack ${stack} --json`)
)

// put the env entries in a file
fs.writeFileSync(
  '.env',
  Object.entries(stackOutput)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
)

console.info(`created env file for stack: ${stack}`)
