import Game from 'game'
import Wall from 'objects/wall'
import Player from 'objects/player'

const player1 = new Player(430, Game.canvas.height - 350, 50, 50)
const floor = new Wall(300, Game.canvas.height - 300, Game.canvas.width - 600, 20)
const platform = new Wall(450, Game.canvas.height - 420, 200, 20)
const platform2 = new Wall(1200, Game.canvas.height - 420, 200, 20)
const platform3 = new Wall(810, Game.canvas.height - 520, 250, 20)

Game.addObject(player1)
Game.addObject(floor)
Game.addObject(platform)
Game.addObject(platform2)
Game.addObject(platform3)

const gameLoop = () => {
    Game.draw()
    // setTimeout(() => {
        requestAnimationFrame(gameLoop)
    // }, 300)
}

gameLoop();

(<any>window).Game = Game
