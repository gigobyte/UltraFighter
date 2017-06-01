import Game from './game'

interface IEventEmitter {
    emit: (event: string) => void
}

class EventEmitter implements IEventEmitter {
    emit(event: string) {
        Game.objects.forEach((obj) => {
            const objProperties = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))

            for (const property of objProperties) {
                if (property.toLowerCase().replace('on', '') === event) {
                    (obj as any)[property]()
                }
            }
        })
    }
}

export default new EventEmitter()
