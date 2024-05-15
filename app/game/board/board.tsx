'use client'

import { Fruit } from '../fruit'
import { Snake } from '../snake/snake'
import { useSnake } from '../snake/use-snake'
import { useGame } from '../use-game'
import { BOARD_COLUMN_NUMBER, BOARD_COLUMN_SIZE } from './board-constants'

const MAP_SIZE = BOARD_COLUMN_NUMBER * BOARD_COLUMN_SIZE

export const Board = () => {
    const { isGameOver, setIsGameOver, fruitCoordinates } = useGame()

    const handleGameOver = () => {
        setIsGameOver(true)
    }

    const { coordinates: snakeCoordinates } = useSnake({ onGameOver: handleGameOver, isGameOver })

    return (
        <div
            className="relative mx-auto bg-slate-800"
            style={{ width: MAP_SIZE, height: MAP_SIZE }}
        >
            <Snake coordinates={snakeCoordinates} />
            <Fruit coordinate={fruitCoordinates} />
        </div>
    )
}
