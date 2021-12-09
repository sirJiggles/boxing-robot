import { CombatManager } from './combat'

export type Config = {
  queueForRobotToConsumeUrl: string
  topicForRobotToPostToArn: string
  region: string
  secretAccessKey: string
  accessKeyId: string
  queueForAppToConsumeUrl: string
  topicForAppToPostToArn: string
}

export type WorkoutConfig = {
  duration?: number
  difficulty?: number
  pauseDuration?: number
  // make these optional for now we may want to remove them
  armsEnabled?: Array<number>
}

export enum Message {
  starting = 'starting',
  busy = 'busy',
  ready = 'ready',
  stopWorkout = 'stop',
  hug = 'hug',
}

export interface ICombatManager {
  processingCombo: boolean
  comboTimeout: NodeJS.Timeout | undefined
  config: WorkoutConfig | undefined
  armsOut: boolean[]
  doHit: (options: { arm: number; asCombo?: boolean; nextArm?: number }) => void
  startCombo: () => void
  stopHits: () => void
  doCombo: () => void
}

export interface IWorkoutManager {
  running: boolean
  config: WorkoutConfig | undefined
  timeSpentWorkingOut: number
  tickInterval: NodeJS.Timeout | undefined
  combatManager: CombatManager
  tick: () => void
  stop: () => void
  start: (options: WorkoutConfig) => void
}
