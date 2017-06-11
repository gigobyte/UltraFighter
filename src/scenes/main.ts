import Game from 'game'
import Wall from 'objects/wall'
import Player from 'objects/player'
import EnemySpawner from 'objects/enemySpawner'
import gameSettings from 'common/gameSettings'

const player = new Player(gameSettings.defaultPlayerPosition.x, gameSettings.defaultPlayerPosition.y)
const floor = new Wall(300, Game.canvas.height - 300, Game.canvas.width - 600, 20)
const platform = new Wall(450, Game.canvas.height - 420, 200, 20)
const platform2 = new Wall(1200, Game.canvas.height - 420, 200, 20)
const platform3 = new Wall(810, Game.canvas.height - 520, 250, 20)
const enemySpawner = new EnemySpawner()

const mainScene = Game.createScene('main')

mainScene.addObject('player', player)
mainScene.addObject('floor', floor)
mainScene.addObject('platform1', platform)
mainScene.addObject('platform2', platform2)
mainScene.addObject('platform3', platform3)
mainScene.addObject('enemySpawner', enemySpawner)

export default mainScene
