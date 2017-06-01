import Game from 'game'

class EventEmitter {
    public static emit(event: string) {
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

export default EventEmitter
