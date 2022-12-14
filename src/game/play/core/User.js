import { InputController } from './helpers/inputController'
import { EventEmitter } from './helpers/EventEmitter'

export class User extends EventEmitter {
  /**
   * @param {string} color
   * @param {string} name
   * @param {InputController} inputController
   */
  constructor(color, name, inputController) {
    super()
    this.inputController = inputController
    this.points = 0
    this.name = name
    this.color = color

    this.controls = {
      keys: {
        left: [37],
        right: [39],
      },
      pressHistory: [],
      last: null,
    }

    this.onKeyDown = (e => {
      if (
        ![this.controls.keys.left, this.controls.keys.right].includes(e) ||
        e === this.controls.last
      ) {
        return
      }
      this.controls.pressHistory.unshift(e)
      this.controls.last = e
      this.onControlChange()
    }).bind(this)
    inputController.on('keydown', this.onKeyDown)

    this.onKeyUp = (e => {
      if (
        ![this.controls.keys.left, this.controls.keys.right].includes(e) ||
        e === this.controls.last
      ) {
        return
      }
      this.controls.pressHistory.splice(
        this.controls.pressHistory.indexOf(e),
        1
      )
      // Resore last
      this.controls.last = this.controls.pressHistory[0]
      this.onControlChange()
    }).bind(this)
    inputController.on('keyup', this.onKeyUp)
  }
  onControlChange() {
    const key =
      Object.keys(this.controls.keys).find(key =>
        this.controls.keys[key].includes(this.controls.last)
      ) || null
    this.emit('input', key)
  }
  /**
   * Set keyboard controls
   * @param {number[]} left
   * @param {number[]} right
   */
  setControls(left, right) {
    this.controls.keys.left = left
    this.controls.keys.right = right
  }
  destroy() {
    this.inputController.off('keydown', this.onKeyDown)
    this.inputController.off('keyup', this.onKeyUp)
  }
}
