import * as aws from '@pulumi/aws'

// Method in pulumi is imported from swagger so I redefine it here 😢
export type Method =
  | 'ANY'
  | 'GET'
  | 'PUT'
  | 'POST'
  | 'DELETE'
  | 'PATCH'
  | 'OPTIONS'

export type APIConfig = {
  name: string
  eventHandler: aws.lambda.Function
  stageName?: string
  path?: string
  method?: Method
}
