import { EventListener } from 'infrastructure/eventEmitter/types'
import { Action } from '../../shared/actions'
import GameObject from 'infrastructure/entities/gameObject'
import Game from 'infrastructure/game'
import gameSettings from 'store/gameSettings'

class Player extends GameObject implements EventListener {
    pos: { x: number, y: number }
    dims: { w: 50, h: 50 } = {w: 50, h: 50}
    velocity = { x: 0, y: 0 }
    moving = { left: false, right: false, up: false }
    pressed = { left: false, right: false, up: false }
    isStatic = false

    constructor(x: number, y: number) {
        super()
        this.pos = { x, y }
    }

    private setNewYPosition(): void {
        const currentY = this.pos.y
        const collisions = Game.checkCollision(this.getEdges())

        this.moving.up = this.velocity.y < 0

        if (collisions.yAbove) {
            this.velocity.y = 0
            this.moving.up = false
        }

        if (collisions.yBelow && !this.moving.up) {
            this.velocity.y = 0
        } else {
            this.velocity.y += gameSettings.gravity
        }

        const stepSize = this.velocity.y > 0 ? 1 : -1

        while (this.pos.y !== currentY + this.velocity.y) {
            this.pos.y += stepSize

            const nextCollisions = Game.checkCollision(this.getEdges())

            if (nextCollisions.yBelow || nextCollisions.yAbove) {
                break
            }
        }
    }

    private setNewXPosition(): void {
        const currentX = this.pos.x
        const collisions = Game.checkCollision(this.getEdges())

        this.moving.right = this.velocity.x > 0
        this.moving.left = this.velocity.x < 0

        if (this.pressed.right) {
            this.velocity.x = gameSettings.hspeed
        }

        if (this.pressed.left) {
            this.velocity.x = -gameSettings.hspeed
        }

        if (collisions.xLeft && this.velocity.x < 0) {
            this.moving.left = false
            this.velocity.x = 0
        }

        if (collisions.xRight && this.velocity.x > 0) {
            this.moving.right = false
            this.velocity.x = 0
        }

        if (!this.pressed.left && !this.pressed.right) {
            this.velocity.x = 0
        }

        const stepSize = this.velocity.x > 0 ? 1 : -1

        while (this.pos.x !== currentX + this.velocity.x) {
            this.pos.x += stepSize

            const nextCollisions = Game.checkCollision(this.getEdges())

            if (nextCollisions.xLeft || nextCollisions.xRight) {
                break
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        this.setNewYPosition()
        this.setNewXPosition()

        ctx.fillStyle = 'black'
        ctx.textAlign = 'center'
        ctx.font = '16px Ariel'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
        // ctx.fillText(gameSettings.username, this.pos.x + 25, this.pos.y - 10)
    }

    
    public onAction(action: Action) {
        if (action.kind === 'key-pressed') {
            this.handleKeyPressed(action.payload)
        }

        if (action.kind === 'key-released') {
            this.handleKeyReleased(action.payload)
        }
    }

    private handleKeyPressed(keyCode: string) {
        if (keyCode === 'ArrowUp') {
            if (!this.pressed.up && !this.moving.up && this.velocity.y <= 0) {
                this.velocity.y = -gameSettings.vspeed
                this.pressed.up = true
            }
        }

        if (keyCode === 'ArrowLeft') {
            this.pressed.left = true
            this.velocity.x = -gameSettings.hspeed
        }

        if (keyCode === 'ArrowRight') {
            this.pressed.right = true
            this.velocity.x = gameSettings.hspeed
        }
    }

    private handleKeyReleased(keyCode: string) {
        if (keyCode === 'ArrowUp') {
            this.pressed.up = false
        }

        if (keyCode === 'ArrowLeft') {
            this.pressed.left = false
        }

        if (keyCode === 'ArrowRight') {
            this.pressed.right = false
        }
    }
}

export default Player