import { Renderer } from './Renderer'
import { Round } from './Round'
import { User } from './User'
import { EventEmitter } from './helpers/EventEmitter'
export class Game extends EventEmitter {
  /**
   * Renderer instance
   * @param {Renderer} renderer
   * @param {InputController} inputController
   * @param {{width: number, height: number}} config
   * @param {import('src/game/PlayerLabel.jsx').Player[]} players
   *
   */
  constructor(renderer, inputController, config, players = []) {
    super()
    this.inputController = inputController
    this.renderer = renderer
    this.countDownFrom = 3
    this.countDownRemain = this.countDownFrom
    this.countDownInterval
    this.mapSize = {
      x: config.width,
      y: config.height,
    }
    /**
     * @type {Round[]}
     */
    this.rounds = []
    /**
     * @type {User[]}
     */

    this.users = players.map(user => {
      const newUser = new User(user.color, user.name, this.inputController)
      newUser.setControls(`${user.playerId}.LEFT`, `${user.playerId}.RIGHT`)
      return newUser
    })
    console.log('USERS', this.users)
    this.finished = false
  }
  /**
   * Add new player instance to game
   * @param {User} user
   */
  newUser(user) {
    console.log('NEW USER', user)
    this.users.push(user)
  }
  countDown(round) {
    console.log('Count from ', this.countDownRemain)
    document.querySelector('.countDown').innerHTML = this.countDownRemain
    if (this.countDownRemain <= 0) {
      clearInterval(this.countDownInterval)
      round.start()
      document.querySelector('.countDown').innerHTML = ''
    }
    this.countDownRemain -= 1
  }
  newRound() {
    this.countDownRemain = this.countDownFrom
    const round = new Round(this)
    this.rounds.push(round)
    this.countDownInterval = setInterval(() => this.countDown(round), 1000)

    round
      .on('end', () => this.onRoundEnd(round))
      .on('crash', user => {
        this.users.filter(u => u !== user).forEach(u => u.points++)
        this.users.sort((prev, next) => next.points - prev.points)
        this.emit('scoreUpdate', this.users)
      })
      .on('prepareToEnd', () => {
        // TO DO CHANGE
        this.users.sort((prev, next) => next.points - prev.points)
        if (this.isWinner()) {
          this.onFinish()
        }
      })
  }
  isWinner() {
    return (
      this.users[0].points >= this.users.length * 5 &&
      this.users[0].points > this.users[1].points + 1
    )
  }
  /**
   * @param {Round} round
   */
  onRoundEnd(round) {
    this.emit('roundEnd', this.rounds.indexOf(round))
    if (!this.finished) {
      this.newRound()
    }
  }
  onFinish() {
    const winner = this.users[0]
    this.finished = true
    const winnerMsg = {
      /** @param {CanvasRenderingContext2D} ctx */
      draw: ctx => {
        ctx.fillStyle = winner.color
        ctx.strokeStyle = winner.color
        ctx.font = '40px san-serif'

        const textString = `GAME OVER`
        const textWidth = ctx.measureText(textString).width

        const textString2 = `${winner.name} wins!`
        const textWidth2 = ctx.measureText(textString2).width

        const width = Math.max(textWidth, textWidth2) + 40

        ctx.lineWidth = 5
        ctx.strokeRect(
          (this.mapSize.x - width) / 2,
          this.mapSize.y / 2 - 75,
          width,
          100
        )
        ctx.fillText(
          textString,
          this.mapSize.x / 2 - textWidth / 2,
          this.mapSize.y / 2 - 30
        )
        ctx.fillText(
          textString2,
          this.mapSize.x / 2 - textWidth2 / 2,
          this.mapSize.y / 2 + 10
        )
        // ...
      },
    }
    this.renderer.push(winnerMsg)
    this.inputController.once('keydown/32', () => {
      this.renderer.remove(winnerMsg)
      this.emit('finish', this.users)
    })
  }
  startGame() {
    this.rounds = []
    this.users.forEach(user => (user.points = 0))
    this.finished = false
    this.newRound()
  }
}
