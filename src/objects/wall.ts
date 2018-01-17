import GameObject from 'infrastructure/gameObject'

class Wall extends GameObject {
    pos: { x: number, y: number }
    dims: { w: number, h: number }

    constructor(x: number, y: number, w: number, h: number) {
        super()
        this.pos = { x, y }
        this.dims = { w, h }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.pos.x, this.pos.y, this.dims.w, this.dims.h)
    }
}

export default Wall
