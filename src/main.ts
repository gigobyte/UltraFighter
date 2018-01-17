import gameSettings from "store/gameSettings"
import Game from 'infrastructure/game'
import mainScene from 'scenes/main'

const gameEl = <HTMLElement>document.querySelector('.game-container')
const menuEl = <HTMLElement>document.querySelector('.menu-container')
const usernameInputEl = <HTMLInputElement>document.querySelector('.user-input')
const startButtonEl = <HTMLButtonElement>document.querySelector('.start-button')

const initGame = () => {
    gameEl.style.display = 'initial'
    menuEl.style.display = 'none'

    Game.init({
        scene: mainScene
    })
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