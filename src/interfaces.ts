export interface IGameObject {
    draw: (ctx: CanvasRenderingContext2D) => void
    pos: {x: number, y: number}
    dims: {w: number, h: number}
}

export interface IEventListeners {
    [key: string]: () => void
}
