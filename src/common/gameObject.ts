import { Position } from 'common/interfaces'

export interface IGameObject {
    draw: (ctx: CanvasRenderingContext2D) => void
    pos: {x: number, y: number}
    dims: {w: number, h: number}
    getEdges(): Position
}

abstract class GameObject implements IGameObject {
    pos: {x: number, y: number}
    dims: {w: number, h: number}

    public getEdges(): Position {
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
