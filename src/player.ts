import Game from './game'
import { GameObject, Edges } from './interfaces'
import gameSettings from './gameSettings'

interface IPlayer extends GameObject {
    velocity: {x: number, y: number}
    onArrowUpPressed: () => void
    onArrowLeftPressed: () => void
    onArrowLeftReleased: () => void
    onArrowRightPressed: () => void
    onArrowRightReleased: () => void
    moving: {left: boolean, right: boolean, up: boolean}
    pressed: {left: boolean, right: boolean}
}

class Player implements IPlayer {
    pos: {x: number, y: number}
    dims: {w: number, h: number}
    velocity = {x: 0, y: 0}
    moving = {left: false, right: false, up: false}
    pressed = {left: false, right: false, up: false}

    constructor(x: number, y: number, w: number, h: number) {
        this.pos = {x, y}
        this.dims = {w, h}
    }

    getEdges(): Edges {
        return {
            a: {
                x: this.pos.x,
                y: this.pos.y + this.dims.h
            },
            b: {
                x: this.pos.x + this.dims.w,
                y: this.pos.y + this.dims.h
            },
            c: {
                x: this.pos.x + this.dims.w,
                y: this.pos.y
            },
            d: {
                x: this.pos.x,
                y: this.pos.y
            }
        }
    }

    private getSteps(velocity: number): number[] {
        return Array.from(Array(Math.abs(velocity)))
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

        if (this.pressed.left && this.pressed.right) {
            this.velocity.x = 0
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

    draw(ctx: CanvasRenderingContext2D) {
        this.setNewYPosition()
        this.setNewXPosition()

        ctx.fillStyle = 'black'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
    }

    onArrowUpPressed() {
        if (!this.pressed.up && !this.moving.up && this.velocity.y <= 0) {
            this.velocity.y = -gameSettings.vspeed
            this.pressed.up = true
        }
    }

    onArrowUpReleased() {
        this.pressed.up = false
    }

    onArrowLeftPressed() {
        this.pressed.left = true
        this.velocity.x = -gameSettings.hspeed
    }

    onArrowLeftReleased() {
        this.pressed.left = false
    }

    onArrowRightPressed() {
        this.pressed.right = true
        this.velocity.x = gameSettings.hspeed
    }

    onArrowRightReleased() {
        this.pressed.right = false
    }
}

export default Player
