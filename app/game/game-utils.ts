import { BOARD_COLUMN_NUMBER, BOARD_COLUMN_SIZE } from './board/board-constants'
import { Coordinate } from './snake/snake-types'

// Convert the coordinates to the actual position on the board
export const getPositionFromCoordinates = (x: number, y: number) => {
    return {
        transform: `translate(${x * BOARD_COLUMN_SIZE}px, ${y * BOARD_COLUMN_SIZE}px)`,
    }
}

// Get random coordinates for the fruit excluding the snake's current coordinates
export const getFruitRandomCoordinates = (snakeCoordinates: Coordinate[]): Coordinate => {
    const minCoordinate = 0
    const maxCoordinate = BOARD_COLUMN_NUMBER

    // We don't want the fruit to be generated on the snake's current coordinates
    const isExcluded = (coordinate: Coordinate) =>
        snakeCoordinates.some(
            (snakeCoordinate) =>
                snakeCoordinate.x === coordinate.x && snakeCoordinate.y === coordinate.y
        )

    let x, y
    do {
        x = Math.floor(Math.random() * (maxCoordinate - minCoordinate)) + minCoordinate
        y = Math.floor(Math.random() * (maxCoordinate - minCoordinate)) + minCoordinate
    } while (isExcluded({ x, y }))

    return { x, y }
}
