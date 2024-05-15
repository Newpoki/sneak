import { Coordinate } from './snake/snake-types'
import { getPositionFromCoordinates } from './game-utils'
import { BOARD_COLUMN_SIZE } from './board/board-constants'

type FruitProps = {
    coordinate: Coordinate
}

export const Fruit = ({ coordinate }: FruitProps) => {
    return (
        <div
            className="absolute bg-red-500"
            style={{
                ...getPositionFromCoordinates(coordinate.x, coordinate.y),
                height: BOARD_COLUMN_SIZE,
                width: BOARD_COLUMN_SIZE,
            }}
        />
    )
}
