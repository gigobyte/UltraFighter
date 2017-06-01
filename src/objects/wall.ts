import { GameObject, Edges } from 'common/interfaces'

class Wall implements GameObject {
    pos: {x: number, y: number}
    dims: {w: number, h: number}

    constructor(x: number, y: number, w: number, h: number) {
        this.pos = {x, y}
        this.dims = {w, h}
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
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
}

export default Wall
