import Game from './game'
import Wall from './wall'
import Player from './player'

const player1 = new Player(200, 200, 50, 50)
const floor = new Wall(0, Game.canvas.height - 20, Game.canvas.width, 20)
const floor2 = new Wall(400, Game.canvas.height - 100, 60, 20)

Game.addObject(player1)
Game.addObject(floor)
// Game.addObject(floor2)

const gameLoop = () => {
    Game.draw()
    requestAnimationFrame(gameLoop)
}

gameLoop()
