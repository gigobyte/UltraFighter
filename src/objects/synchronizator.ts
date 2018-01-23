import { Action } from './../../shared/actions';
import Game from 'infrastructure/game'
import GameController from 'infrastructure/entities/gameController'
import EnemyPlayer from 'objects/enemyPlayer'
import gameSettings from 'store/gameSettings'

class Synchronizator extends GameController {
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
