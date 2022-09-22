import React from 'react'
import { usePlayers } from 'src/connection/PeerProvider'
import { PlayersList } from '../PlayersList'
import { Playground } from './Playground'

interface PlayProps {}

const Play = (props: PlayProps): JSX.Element => {

  const players = usePlayers()
  return (
    <div>
      <Playground />
      <div style={{ position: 'absolute', top: '0px', right: '0px' }}>
        <PlayersList players={players} />
      </div>
    </div>
  )
}

export default Play
