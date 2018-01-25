import { Action } from './../../../../shared/actions';
import { GameObjectEdges } from 'infrastructure/entities/gameObject/types'
import { EventListener } from 'infrastructure/eventEmitter/types'

abstract class GameObject implements EventListener {
    pos: { x: number, y: number }
    dims: { w: number, h: number }
    zIndex: number
    isStatic: boolean

    public getEdges(): GameObjectEdges {
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

    public onAction(_: Action) {}
}

export default GameObject
