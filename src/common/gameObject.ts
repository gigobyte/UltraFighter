import { Edges } from 'common/interfaces'

export interface IGameObject {
    draw: (ctx: CanvasRenderingContext2D) => void
    pos: {x: number, y: number}
    dims: {w: number, h: number}
    getEdges(): Edges
}

abstract class GameObject implements IGameObject {
    pos: {x: number, y: number}
    dims: {w: number, h: number}

    public getEdges(): Edges {
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

    abstract draw(ctx: CanvasRenderingContext2D): void
}

export default GameObject
