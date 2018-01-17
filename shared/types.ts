import { Action } from './actions'

export type GetPayload<T extends Action> = T['payload']