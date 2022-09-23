import { UI } from './UI'
import { Game } from './Game'
import { User } from './User'
import { InputController } from './helpers/inputController'
import { Player } from '../../PlayerLabel'

const mockUsers = [
  {
    playerId: '4254353462534TRSGDF',
    color: '#44A',
    name: 'Pankrác',
    controlsLeft: [37], //=>`${playerId}.LEFT"
    controlsRight: [39], //=>4254353462534TRSGDF.RIGHT
  },
  {
    playerId: 'DDDDDFA',
    color: '#0FA',
    name: 'Jarmil',
    controlsLeft: [81], //=>"GSDFGDFGSD.LEFT"
    controlsRight: [87], //=>"GSDFGDFGSD.RIGHT"
  },
]

export class Main {
  inputController: InputController
  ui: UI
  game: Game
  gameStarted: boolean

  /**
   * Main class
   * @param {HTMLElement} $app
   */
  constructor($app, playerList: Player[], controllEventEmitter) {
    const currentPlayersList = [...playerList, ...mockUsers]
    $app.setAttribute('tabindex', '1')
    $app.style.display = 'block'
    this.inputController = controllEventEmitter
    this.ui = new UI($app, this.inputController, currentPlayersList)
    this.game = new Game(
      this.ui.render,
      this.inputController,
      {
        width: this.ui.width - 150,
        height: this.ui.height,
      },
      currentPlayersList
    )
    this.gameStarted = false

    this.ui.on(
      'setUser',
      /**
       * @param {{color: string, name: string, controlsLeft: number[], controlsRight: number[]}} config
       */
      config => {
        let user = this.game.users.find(user => user.color === config.color)
        if (!user) {
          const user = new User(config.color, config.name, this.inputController)
          user.setControls(config.controlsLeft, config.controlsRight)
          this.game.newUser(user)
        } else {
          if (config.color) {
            user.color = config.color
          }
          if (config.controlsLeft && config.controlsRight) {
            user.setControls(config.controlsLeft, config.controlsRight)
          }
        }
      }
    )
    this.ui.on(
      'delUser',
      /**
       * @param {string} color
       */
      color => {
        const idx = this.game.users.findIndex(user => user.color === color)
        this.game.users[idx].destroy()
        this.game.users.splice(idx, 1)
      }
    )

    this.ui.on('startGame', () => {
      this.startGame()
    })

    this.game.on(
      'scoreUpdate',
      /**
       * @param {User[]} users
       */
      users => {
        this.ui.updateScore(users)
      }
    )

    this.game.on(
      'finish',
      /**
       * @param {User[]} users
       */
      users => {
        this.gameStarted = false
        this.game.rounds = []
        this.game.users.forEach(user => (user.points = 0))
        this.ui.finishGame()
      }
    )
    this.startGame()
  }
  startGame() {
    if (this.gameStarted) return
    if (this.game.users.length < 2) {
      alert('musí byt alespoň 2!')
      return
    }

    this.gameStarted = true
    this.ui.initGame(this.game.users)
    this.game.startGame()
  }
}
