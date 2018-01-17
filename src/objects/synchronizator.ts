import { Action } from './../../shared/actions';
import Game from 'infrastructure/game'
import GameObject from 'infrastructure/gameObject'
import EnemyPlayer from 'objects/enemyPlayer'
import gameSettings from 'store/gameSettings'

class Synchronizator extends GameObject {
    pos: { x: 0, y: 0 }
    dims: { w: 0, h: 0 }

    constructor() {
        super()
        this.pos = { x: 0, y: 0 }
        this.dims = { w: 0, h: 0 }
    }

    public draw() { }

    onAction(action: Action) {
        if (action.kind === 'sync-coordinates') {
            const { data } = action.payload

            data.enemy = data.player
            delete data.player

            Game.currentScene.objects.forEach((obj, id) => {
                if (data[id]) {
                    obj.pos = data[id]
                }
            })
        }
    }
}

export default Synchronizator
