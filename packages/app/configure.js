/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require('child_process')
const fs = require('fs')

const stack = process.env.STACK || 'dev'

const stackOutput = JSON.parse(
  execSync(
    `pulumi stack output --cwd ../infra --stack ${stack} --json --show-secrets`
  )
)

// put the env entries in a file
fs.writeFileSync(
  '.env',
  Object.entries(stackOutput)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n')
)

console.info(`created env file for stack: ${stack}`)
