import GameObject from 'infrastructure/entities/gameObject'
import EventEmitter from 'infrastructure/eventEmitter'
import { EventListener } from 'infrastructure/eventEmitter/types';

class Scene {
    public tag: string
    public objects: Map<string, GameObject>

    constructor(tag: string) {
        this.tag = tag
        this.objects = new Map()
    }

    public addObject(id: string, obj: GameObject): void {
        this.objects.set(id, obj)
        EventEmitter.addListener(obj)
    }

    public addListenerObject(id: string, obj: GameObject): void {
        this.objects.set(id, obj)
    }

    public removeObject(obj: GameObject) {
        const objectEntry = Array.from(this.objects).find(([_, sceneObj]) => sceneObj === obj)

        if (objectEntry) {
            const [ key, gameObj ] = objectEntry
            this.objects.delete(key)
            EventEmitter.removeListener(gameObj)
        } else {
            throw new Error('Scene.removeObject - Tried to remove unexisting object')
        }
    }
}

export default Scene;
