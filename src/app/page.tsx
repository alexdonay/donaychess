import Game from '@/game/Game'
import Link from 'next/link'
import Board from './board/Board'
import PieceContainer from './board/PieceContainer'

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '70vh'
}

const headerStyle = {
  textAlign: 'center'
}

export default function Home () {
  const game = new Game()

  return (
    <div>
      <div style={containerStyle}>
        <header
          style={{
            display: 'flex',
            gap: '12px',
            flexDirection: 'row',
            alignContent: 'space-between'
          }}
        >
          <p>logo</p>
          <ul>
            <li style={{ display: 'flex', gap: '12px' }}>
              <Link href={'/'}>Inicio </Link>
              <Link href={'/newgame'}>home</Link>
            </li>
          </ul>
        </header>
        <div>
          <Board />
          <PieceContainer />
        </div>
      </div>
    </div>
  )
}
