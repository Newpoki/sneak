import { useEffect, useState } from 'react'
import { Fruit } from '../fruit'
import { Snake } from '../snake/snake'
import { Coordinate, Direction } from '../snake/snake-types'
import { BOARD_COLUMN_NUMBER, BOARD_COLUMN_SIZE } from './board-constants'
import { GameStatus } from '../game-types'

const MAP_SIZE = BOARD_COLUMN_NUMBER * BOARD_COLUMN_SIZE

type BoardProps = {
    snakeCoordinates: Array<Coordinate>
    direction: Direction
    fruitCoordinates: Coordinate
    gameStatus: GameStatus
    onStart: () => void
}

export const Board = ({
    snakeCoordinates,
    direction,
    fruitCoordinates,
    gameStatus,
    onStart,
}: BoardProps) => {
    const [countBeforeStart, setCountBeforeStart] = useState(3)

    // Count from 3 to 1 before starting the game
    // Reset the count to 3 when the game start so we can start the countdown again
    useEffect(() => {
        if (gameStatus !== 'STARTING') {
            return
        }

        const interval = setInterval(() => {
            setCountBeforeStart((prevCount) => {
                if (prevCount !== 1) {
                    return prevCount - 1
                }

                clearInterval(interval)
                onStart()
                return 3
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [gameStatus, onStart])

    return (
        <div
            className="relative mx-auto box-content rounded-md border-2 border-white bg-slate-800"
            style={{ width: MAP_SIZE, height: MAP_SIZE }}
        >
            {gameStatus === 'STARTING' ? (
                <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white">
                    {countBeforeStart}
                </div>
            ) : (
                <>
                    <Snake coordinates={snakeCoordinates} direction={direction} />
                    <Fruit coordinate={fruitCoordinates} />
                </>
            )}
        </div>
    )
}
