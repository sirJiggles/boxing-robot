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
  duration: number
  difficulty: number
}

export enum Message {
  starting = 'starting',
  busy = 'busy',
  ready = 'ready',
  stopWorkout = 'stop',
}

export interface ICombatManager {
  processingCombo: boolean
  comboTimeout: NodeJS.Timeout | undefined
  armsOut: boolean[]
  doHit: (options: { arm: number; asCombo?: boolean; nextArm?: number }) => void
  startCombo: () => void
  stopHits: () => void
  doCombo: () => void
}

export interface IWorkoutManager {
  running: boolean
  workoutDuration: number
  timeSpentWorkingOut: number
  tickInterval: NodeJS.Timeout | undefined
  combatManager: CombatManager
  tick: () => void
  stop: () => void
  start: (options: { duration: number }) => void
}
