'use client'

import { Snake } from '../snake/snake'
import { useSnake } from '../snake/use-snake'
import { BOARD_COLUMN_NUMBER, BOARD_COLUMN_SIZE } from './board-constants'

const MAP_SIZE = BOARD_COLUMN_NUMBER * BOARD_COLUMN_SIZE

export const Board = () => {
    const { coordinates } = useSnake()

    return (
        <div
            className="relative mx-auto bg-slate-800"
            style={{ width: MAP_SIZE, height: MAP_SIZE }}
        >
            <Snake coordinates={coordinates} />
        </div>
    )
}
