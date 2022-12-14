import { Game } from './Game'

import { User } from './User'
import { Player } from './Player'

import { EventEmitter } from './helpers/EventEmitter'
import { int } from './helpers/random'

export class Round extends EventEmitter {
  /**
   * Round class
   * @param {Game} game
   */
  constructor(game) {
    super()
    this.game = game
    this.started = false
    this.ended = false
    this.paused = false

    /**
     * @type {Map<User, Player>}
     */
    this.players = new Map()
    for (const user of game.users) {
      this.newPlayer(user)
    }

    const mapSize = this.game.mapSize
    this.border = {
      /** @param {CanvasRenderingContext2D} ctx */
      draw(ctx) {
        ctx.strokeStyle = 'yellow'
        ctx.strokeRect(0, 0, mapSize.x, mapSize.y)
      },
    }
    this.game.renderer.push(this.border)
  }
  /**
   * Return `true` if player is out of map
   * @param {Player} player
   */
  isOutOfMap(player) {
    const padding = 1
    return (
      player.position.x < padding ||
      player.position.y < padding ||
      player.position.x > this.game.mapSize.x - padding ||
      player.position.y > this.game.mapSize.y - padding
    )
  }
  /**
   * @param {User} user
   */
  newPlayer(user) {
    const { x, y } = this.generatrePosition(this.game.users.indexOf(user))
    const player = new Player(this.game.renderer.ctx, {
      x,
      y,
      angle: int(0, 360),
      color: user.color,
    })
    this.players.set(user, player)
    this.game.renderer.push(player)
    user.on('input', dir => {
      if (!this.started || this.ended) {
        return
      }
      player.vector =
        {
          left: -1,
          right: 1,
        }[dir] || 0
    })
    player.on('pre/update', () => {
      if (player.immune) return
      if (
        this.isOutOfMap(player) ||
        Array.from(this.players.values()).some(p =>
          p.curve.interfere(
            player.position,
            player.curve.weight / 2,
            p === player
          )
        )
      ) {
        player.stop = true
        player.crashed = true
        player.emit('crash')
        this.emit('crash', user)
        if (
          [...this.players.values()].filter(player => player.crashed === false)
            .length < 2
        ) {
          console.log("This player already CRASHED", [...this.players.values()].filter(player => player.crashed === true))
          this.prepareToEnd()
        }
      }
    })
  }
  prepareToEnd() {
    this.ended = true
    for (const player of this.players.values()) {
      player.stop = true
    }
    this.emit('prepareToEnd', this)
    console.log('prepareToEnd')
    setTimeout(() => this.end(), 2000)
  }
  start() {
    for (const player of this.players.values()) {
      player.stop = false
    }
    this.started = true
  }
  end() {
    for (const user of this.players.keys()) {
      user.off('input')
    }
    for (const player of this.players.values()) {
      this.game.renderer.remove(player)
      player.destroy()
    }
    this.ended = true
    this.game.renderer.remove(this.border)
    this.emit('end')
  }
  /**
   * Generate random position and angle
   * @param {number} i
   */
  generatrePosition(i) {
    return {
      x: int(30, this.game.mapSize.x - 30),
      y: int(30, this.game.mapSize.y - 30),
    }
  }
}
