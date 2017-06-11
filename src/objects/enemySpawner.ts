import Game from 'game'
import GameObject from 'common/gameObject'
import EnemyPlayer from 'objects/enemyPlayer'
import gameSettings from 'common/gameSettings'

class EnemySpawner extends GameObject {
    pos: {x: 0, y: 0}
    dims: {w: 0, h: 0}

    constructor() {
        super()
        this.pos = {x: 0, y: 0}
        this.dims = {w: 0, h: 0}
    }

    public draw() {}

    onUserJoined(username: string) {
        const enemy = new EnemyPlayer(gameSettings.defaultPlayerPosition.x, gameSettings.defaultPlayerPosition.y, username)
        Game.currentScene.addObject('enemy', enemy)
    }
}

export default EnemySpawner
