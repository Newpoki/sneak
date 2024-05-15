'use client'

import { Fruit } from '../fruit'
import { Snake } from '../snake/snake'
import { Coordinate } from '../snake/snake-types'
import { useGame } from '../use-game'
import { BOARD_COLUMN_NUMBER, BOARD_COLUMN_SIZE } from './board-constants'

const MAP_SIZE = BOARD_COLUMN_NUMBER * BOARD_COLUMN_SIZE

type BoardProps = {
    initialSnakeCoordinates: Array<Coordinate>
    initialFruitCoordinates: Coordinate
}

export const Board = ({ initialFruitCoordinates, initialSnakeCoordinates }: BoardProps) => {
    const { fruitCoordinates, snakeCoordinates } = useGame({
        initialFruitCoordinates,
        initialSnakeCoordinates,
    })

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
