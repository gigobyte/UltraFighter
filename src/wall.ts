import { IGameObject } from './interfaces'

class Wall implements IGameObject {
    pos: {x: number, y: number}
    dims: {w: number, h: number}

    constructor(x: number, y: number, w: number, h: number) {
        this.pos = {x, y}
        this.dims = {w, h}
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
    }
}

export default Wall
