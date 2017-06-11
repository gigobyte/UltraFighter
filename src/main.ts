import Game from 'game'
import Connection from 'common/connection'
import gameSettings from 'common/gameSettings'
import mainScene from 'scenes/main'

const gameEl = <HTMLElement>document.querySelector('.game-container')
const menuEl = <HTMLElement>document.querySelector('.menu-container')
const usernameInputEl = <HTMLInputElement>document.querySelector('.user-input')
const startButtonEl = <HTMLButtonElement>document.querySelector('.start-button')

const initGame = () => {
    gameEl.style.display = 'initial'
    menuEl.style.display = 'none'

    const gameLoop = () => {
        Game.draw()
        requestAnimationFrame(gameLoop)
    }

    Game.init()
    Game.setScene(mainScene)
    Connection.init(window.location.origin + ':' + process.env.PORT)
    gameLoop()
}


usernameInputEl.addEventListener('input', (e) => {
    gameSettings.username = (<HTMLInputElement>e.target).value
})

startButtonEl.addEventListener('click', () => {
    if (!gameSettings.username) {
        alert('Input username first!')
        return
    }

    initGame()
})
