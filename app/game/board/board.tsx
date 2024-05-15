import { Fruit } from '../fruit'
import { Snake } from '../snake/snake'
import { Coordinate, Direction } from '../snake/snake-types'
import { BOARD_COLUMN_NUMBER, BOARD_COLUMN_SIZE } from './board-constants'

const MAP_SIZE = BOARD_COLUMN_NUMBER * BOARD_COLUMN_SIZE

type BoardProps = {
    snakeCoordinates: Array<Coordinate>
    direction: Direction
    fruitCoordinates: Coordinate
}

export const Board = ({ snakeCoordinates, direction, fruitCoordinates }: BoardProps) => {
    return (
        <div
            className="relative mx-auto bg-slate-800"
            style={{ width: MAP_SIZE, height: MAP_SIZE }}
        >
            <Snake coordinates={snakeCoordinates} direction={direction} />
            <Fruit coordinate={fruitCoordinates} />
        </div>
    )
}
