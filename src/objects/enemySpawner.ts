import { Action } from '../../shared/actions'
import Game from 'infrastructure/game'
import GameObject from 'infrastructure/gameObject'
import EnemyPlayer from 'objects/enemyPlayer'
import gameSettings from 'store/gameSettings'

class EnemySpawner extends GameObject {
    pos: { x: 0, y: 0 }
    dims: { w: 0, h: 0 }

    constructor() {
        super()
        this.pos = { x: 0, y: 0 }
        this.dims = { w: 0, h: 0 }
    }

    public draw() { }

    onAction(action: Action) {
        if (action.kind === 'user-joined' || action.kind === 'show-enemy-in-room') {
            const enemy = new EnemyPlayer(gameSettings.defaultPlayerPosition.x, gameSettings.defaultPlayerPosition.y, action.payload.username)
            Game.currentScene.addObject('enemy', enemy)
        }
    }
}

export default EnemySpawner
