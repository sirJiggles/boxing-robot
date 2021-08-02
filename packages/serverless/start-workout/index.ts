import { corsHeaders } from './cors-headers'

// this is the lambda
const handler = async () => {
  try {
    const t = 'this is a thing'
    console.log('here we can do some work!', t)
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    }
  }

  return {
    statusCode: 200,
    headers: { ...corsHeaders },
    // just send back the date
    body: JSON.stringify({ theTime: new Date().toTimeString() }),
  }
}

// for running as a lambda
exports.handler = handler
