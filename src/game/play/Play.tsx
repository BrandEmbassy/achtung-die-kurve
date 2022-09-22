import React from 'react'
import { useParams } from 'react-router-dom'
import { PlayersList } from '../PlayersList'
import { usePlayers } from '../usePlayers'
import { Playground } from './Playround'
interface PlayProps {}

const Play = (props: PlayProps): JSX.Element => {
  const { gameId, ...rest } = useParams()

  const players = usePlayers(gameId)
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
