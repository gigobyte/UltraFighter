import { Action } from '../../shared/actions';
import Game from 'infrastructure/game'
import GameObject from 'infrastructure/entities/gameObject'
import gameSettings from 'store/gameSettings'

class EnemyPlayer extends GameObject {
    pos: { x: number, y: number }
    dims: { w: 50, h: 50 }
    username: string

    constructor(x: number, y: number, username: string) {
        super()
        this.pos = { x, y }
        this.username = username
        this.dims = { w: 50, h: 50 }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.font = '16px Ariel'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
        ctx.fillText(this.username, this.pos.x + 25, this.pos.y - 10)
    }

    onAction(action: Action) {
        if (action.kind === 'user-left') {
            if (this.username === action.payload.username) {
                Game.currentScene.removeObject(this)
            }
        }
    }
}

export default EnemyPlayer
