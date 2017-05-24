import { IGameObject } from './interfaces'
import EventEmitter from './eventEmitter'
import Wall from './wall'

interface IGame {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    objects: IGameObject[]
    draw: () => void,
    addObject: (obj: IGameObject) => void
    checkYCollision: (obj: IGameObject) => boolean
}

class Game implements IGame {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    objects: IGameObject[]

    constructor() {
        this.canvas = <HTMLCanvasElement>document.querySelector('#render-target')
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
        this.objects = []

        document.addEventListener('keydown', (e) => {
            console.log(e)
            EventEmitter.emit(e.code.toLowerCase() + 'pressed')
        })

        document.addEventListener('keyup', (e) => {
            EventEmitter.emit(e.code.toLowerCase() + 'released')
        })
    }

    draw(): void {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.objects.forEach((obj) => obj.draw(this.ctx))
    }

    addObject(obj: IGameObject) {
        this.objects.push(obj)
    }

    checkYCollision(obj: IGameObject): boolean {
        const objBottom = obj.pos.y + obj.dims.h
        const wallObjs = this.objects.filter((gameObj) => gameObj instanceof Wall)

        return wallObjs.some((wallObj) => {
            return wallObj.pos.y <= objBottom
        })
    }
}

export default new Game();
