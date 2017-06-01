export interface GameObject {
    draw: (ctx: CanvasRenderingContext2D) => void
    pos: {x: number, y: number}
    dims: {w: number, h: number}
    getEdges(): Edges
}

export interface Edges {
    [key: string]: {x: number, y: number}
}

export interface CollisionResult {
    yBelow: boolean,
    yAbove: boolean,
    xLeft: boolean,
    xRight: boolean
}

export interface Message {
    type: string,
    payload?: any
}
