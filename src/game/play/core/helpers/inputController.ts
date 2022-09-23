import { EventEmitter } from './EventEmitter'

export class InputController extends EventEmitter {
  constructor($el) {
    super()
    $el.addEventListener(
      'keydown',
      (e) => {
        e.preventDefault()
        this.emit('keydown', e)
        this.emit(`keydown/${e.keyCode}`, e)
      },
      false
    )
    $el.addEventListener(
      'keyup',
      (e) => {
        e.preventDefault()
        this.emit('keyup', e)
        this.emit(`keyup/${e.keyCode}`, e)
      },
      false
    )
  }
}
