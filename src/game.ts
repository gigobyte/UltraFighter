import { GameObject, Edges, CollisionResult } from 'common/interfaces'
import EventEmitter from 'events/eventEmitter'
import Wall from 'objects/wall'

interface IGame {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    objects: GameObject[]
    draw: () => void,
    addObject: (obj: GameObject) => void
    checkCollision(edges: Edges): CollisionResult
}

class Game implements IGame {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    objects: GameObject[]

    constructor() {
        this.canvas = <HTMLCanvasElement>document.querySelector('#render-target')
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
        this.objects = []

        document.addEventListener('keydown', (e) => {
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

    addObject(obj: GameObject) {
        this.objects.push(obj)
    }

    checkCollision(edges: Edges): CollisionResult {
        const { a: edgeA, b: edgeB, c: edgeC, d: edgeD } = edges
        const wallObjs = this.objects.filter((gameObj) => gameObj instanceof Wall)

        const DEFAULT_RESULT = {
            yBelow: false,
            yAbove: false,
            xLeft: false,
            xRight: false
        }

        return wallObjs.reduce((result, wallObj) => {
            const { a: wallEdgeA, b: wallEdgeB, c: wallEdgeC, d: wallEdgeD } = wallObj.getEdges()

            if ((edgeB.x > wallEdgeD.x && edgeA.x < wallEdgeC.x) && (edgeA.y === wallEdgeD.y)) {
                result.yBelow = true
            }

            if ((edgeC.x > wallEdgeA.x && edgeD.x < wallEdgeB.x) && (edgeD.y === wallEdgeA.y)) {
                result.yAbove = true
            }

            if ((edgeB.x === wallEdgeA.x) && (edgeB.y > wallEdgeD.y && edgeC.y < wallEdgeA.y)) {
                result.xRight = true;
            }

            if ((edgeA.x === wallEdgeB.x) && (edgeA.y > wallEdgeC.y && edgeD.y < wallEdgeB.y)) {
                result.xLeft = true;
            }

            return result
        }, DEFAULT_RESULT)
    }
}

export default new Game();
