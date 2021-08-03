// this script is used to grab the env vars from the pulumi stack output
// then pass the needed configuration on to the front end when doing things
// like running and so on
// const exposedInfra = require('@boxing-robot/infra/src/expose');

const { execSync } = require('child_process')

const stackOutput = JSON.parse(
  execSync(
    `pulumi stack output --cwd ../infra --stack ${
      process.env.stack || 'dev'
    } --json`
  )
)

// go through the stack out json and make a env var structure we can pipe to
// our application
console.log('REACT_NATIVE_THING=howsitgoing')
// console.log(
//   Object.entries(stackOutput)
//     .map(([key, value]) => `${key}=${value}`)
//     .join(' ')
// )
