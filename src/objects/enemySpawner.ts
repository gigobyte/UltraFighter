import { Action } from '../../shared/actions'
import Game from 'infrastructure/game'
import GameController from 'infrastructure/entities/gameController'
import EnemyPlayer from 'objects/enemyPlayer'
import gameSettings from 'store/gameSettings'

class EnemySpawner extends GameController {
    onAction(action: Action) {
        if (action.kind === 'user-joined' || action.kind === 'show-enemy-in-room') {
            const enemy = new EnemyPlayer(gameSettings.defaultPlayerPosition.x, gameSettings.defaultPlayerPosition.y, action.payload.username)
            Game.currentScene.addObject('enemy', enemy)
        }
    }
}

export default EnemySpawner
