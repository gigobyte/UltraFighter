import { IGameObject } from './interfaces'
import Game from './game'

interface IEventEmitter {
    emit: (event: string) => void
}

class EventEmitter implements IEventEmitter {
    emit(event: string) {
        Game.objects.forEach((obj) => {
            for (const property in obj) {
                if (property.toLowerCase().replace('on', '') === event) {
                    (obj as any)[property]()
                }
            }
        })
    }
}

export default new EventEmitter()
