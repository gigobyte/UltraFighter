import Game from 'game'
import GameObject from 'common/gameObject'
import EnemyPlayer from 'objects/enemyPlayer'
import gameSettings from 'common/gameSettings'

class Synchronizator extends GameObject {
    pos: {x: 0, y: 0}
    dims: {w: 0, h: 0}

    constructor() {
        super()
        this.pos = {x: 0, y: 0}
        this.dims = {w: 0, h: 0}
    }

    public draw() {}

    onCoordinatesSynced(data: any) {
        data.enemy = data.player
        delete data.player

        Game.currentScene.objects.forEach((obj, id) => {
            if (data[id]) {
                obj.pos = data[id]
            }
        })
    }
}

export default Synchronizator
