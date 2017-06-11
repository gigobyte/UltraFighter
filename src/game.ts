import { Position, CollisionResult } from 'common/interfaces'
import GameObject from 'common/gameObject'
import Connection from 'common/connection'
import EventEmitter from 'events/eventEmitter'
import Scene from 'scene'
import Wall from 'objects/wall'
import { syncCoordinates } from 'actions/creators'

interface IGame {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    scenes: Scene[]
    draw: () => void
    checkCollision(edges: Position): CollisionResult
    currentScene: Scene
}

class Game implements IGame {
    public canvas: HTMLCanvasElement
    public ctx: CanvasRenderingContext2D
    public currentScene: Scene
    public scenes: Scene[]

    constructor() {
        this.canvas = <HTMLCanvasElement>document.querySelector('#render-target')
        this.ctx = <CanvasRenderingContext2D>this.canvas.getContext('2d')
        this.scenes = []
    }

    public init(): void {
        document.addEventListener('keydown', (e) => {
            EventEmitter.emit(e.code.toLowerCase() + 'pressed')
        })

        document.addEventListener('keyup', (e) => {
            EventEmitter.emit(e.code.toLowerCase() + 'released')
        })
    }

    public draw(): void {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.currentScene.objects.forEach((obj) => obj.draw(this.ctx))

        const coordinates = Array.from(this.currentScene.objects).reduce((res, [id, obj]) => {
            return res.set(id, obj.pos)
        }, new Map())

        Connection.emit(syncCoordinates({data: coordinates}))
    }

    public createScene(tag: string): Scene {
        const scene = new Scene(tag)
        this.scenes.push(scene)

        return scene
    }

    public setScene(scene: Scene): void {
        this.currentScene = scene
    }

    public checkCollision(edges: Position): CollisionResult {
        const { a: edgeA, b: edgeB, c: edgeC, d: edgeD } = edges
        const objs = Array.from(this.currentScene.objects)

        const DEFAULT_RESULT = {
            yBelow: false,
            yAbove: false,
            xLeft: false,
            xRight: false
        }

        return objs.reduce((result, [_, wallObj]) => {
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
