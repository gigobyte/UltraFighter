import { Action } from '../../../shared/actions'

export interface EventListener {
    onAction: (action: Action) => void
}