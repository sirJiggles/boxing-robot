import * as awsx from '@pulumi/awsx'
import { APIConfig } from './types'

const api = (config: APIConfig) => {
  const { path, method, eventHandler, name, stageName } = config
  return new awsx.apigateway.API(name, {
    stageName: stageName || 'stage',
    routes: [
      {
        path: path || '/',
        method: method || 'GET',
        eventHandler,
      },
      {
        path: path || '/',
        method: 'OPTIONS',
        eventHandler: async () => {
          return {
            statusCode: 200,
            body: '',
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
            },
          }
        },
      },
    ],
  })
}

export { api }
