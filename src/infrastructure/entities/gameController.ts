import GameObject from 'infrastructure/entities/gameObject';

class GameController extends GameObject {
    pos: { x: 0, y: 0 } = {x: 0, y: 0}
    dims: { w: 0, h: 0 } = {w: 0, h: 0}
    isStatic = true

    draw(): void {}
}

export default GameController