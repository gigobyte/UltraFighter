import { EventListener } from 'infrastructure/eventEmitter/types'
import { Action } from '../../../shared/actions'

class EventEmitter {
    listeners: Set<EventListener> = new Set()

    public emit(action: Action): void {
        this.listeners.forEach((listener: EventListener) => listener.onAction(action))
    }

    public addListener(listener: EventListener): void {
        this.listeners.add(listener)
    }

    public removeListener(listener: EventListener): void {
        this.listeners.delete(listener)
    }
}

export default new EventEmitter()
