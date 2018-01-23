export interface GameObjectPosition {
    x: number,
    y: number
}

export interface GameObjectEdges {
    a: GameObjectPosition,
    b: GameObjectPosition,
    c: GameObjectPosition,
    d: GameObjectPosition
}

export interface CollisionResult {
    yBelow: boolean,
    yAbove: boolean,
    xLeft: boolean,
    xRight: boolean
}