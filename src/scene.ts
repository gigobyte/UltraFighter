import GameObject from 'common/gameObject'
import EventEmitter from 'events/eventEmitter'

interface IScene {
    objects: Map<string, GameObject>
    addObject(id: string, obj: GameObject): void
}

class Scene implements IScene {
    public tag: string
    public objects: Map<string, GameObject>

    constructor(tag: string) {
        this.tag = tag
        this.objects = new Map()
    }

    public addObject(id: string, obj: GameObject): void {
        this.objects.set(id, obj)
        EventEmitter.addSubscriber(obj)
    }

    public removeObject(obj: GameObject) {
        for (const [id, sceneObj] of this.objects) {
            if (sceneObj === obj) {
                this.objects.delete(id)
                break
            }
        }
    }
}

export default Scene;
