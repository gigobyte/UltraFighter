class EventEmitter {
    subscribers: Set<Object>

    constructor() {
        this.subscribers = new Set()
    }

    public emit(event: string, payload?: any): void {
        const callObjEventMethod = (obj: Object) => {
            const objProperties = Object.getOwnPropertyNames(Object.getPrototypeOf(obj)).filter((p) => p.startsWith('on'))

            for (const property of objProperties) {
                if (property.toLowerCase().replace('on', '') === event) {
                    (obj as any)[property](payload)
                }
            }
        }

        this.subscribers.forEach(callObjEventMethod)
    }

    public addSubscriber(object: Object): void {
        this.subscribers.add(object)
    }
}

export default new EventEmitter()
