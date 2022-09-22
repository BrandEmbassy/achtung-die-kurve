export class GamePlay {
  private _counting = false
  private _state = {}

  constructor(peerConnections) {
    // peer connect
  }
  
  public async tick() {
    if(this._counting) {
      return this._state
    }
    this._counting = true

    // lastCalcStartTimestamp
    // ...

    this._counting = false
  }
}