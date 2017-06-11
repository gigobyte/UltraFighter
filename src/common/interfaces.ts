export interface Position {
    [key: string]: {x: number, y: number}
}

export interface CollisionResult {
    yBelow: boolean,
    yAbove: boolean,
    xLeft: boolean,
    xRight: boolean
}
