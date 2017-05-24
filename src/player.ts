import Game from './game'
import { IGameObject, IEventListeners } from './interfaces'
import gameSettings from './gameSettings'

interface IPlayer extends IGameObject {
    velocity: {x: number, y: number}
    eventListeners: IEventListeners
    onArrowUpPressed: () => void
    onArrowLeftPressed: () => void
    onArrowLeftReleased: () => void
    onArrowRightPressed: () => void
    onArrowRightReleased: () => void
    moving: {left: boolean, right: boolean, up: boolean}
}

class Player implements IPlayer {
    pos: {x: number, y: number}
    dims: {w: number, h: number}
    eventListeners: IEventListeners
    velocity = {x: 0, y: 0}
    moving = {left: false, right: false, up: false}

    constructor(x: number, y: number, w: number, h: number) {
        this.pos = {x, y}
        this.dims = {w, h}
    }

    draw(ctx: CanvasRenderingContext2D) {
        let hitTheGound = false

        if (Game.checkYCollision(this)) {
            hitTheGound = true
        } else {
            for(const i of Array(this.velocity.y)) {
                this.pos.y += 1
                if (Game.checkYCollision(this)) {
                    this.moving.up = false
                    this.velocity.y = 0
                    hitTheGound = true
                    break
                }
            }
        }

        if (!hitTheGound) {
            this.velocity.y += gameSettings.gravity
            this.pos.y += this.velocity.y
        }

        if (this.moving.right || this.moving.left) {
            this.pos.x += this.velocity.x
        }

        if (!this.moving.right && this.velocity.x > 0) {
            this.velocity.x *= gameSettings.friction
            this.pos.x += this.velocity.x
        }

        ctx.fillStyle = 'black'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
    }

    onArrowUpPressed() {
        if (!this.moving.up) {
            this.velocity.y = -17
            this.moving.up = true
        }
    }

    onArrowLeftPressed() {
        if (!this.moving.left) {
            this.moving.left = true
            this.velocity.x = -5
        }
    }

    onArrowLeftReleased() {
        this.moving.left = false
    }

    onArrowRightPressed() {
        if (!this.moving.right) {
            this.moving.right = true
            this.velocity.x = 5
        }
    }

    onArrowRightReleased() {
        this.moving.right = false
    }
}

export default Player
