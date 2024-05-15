import { Board } from './board/board'
import { getFruitRandomCoordinates } from './game-utils'

const getInitialCoordinates = () => {
    const snakeCoordinates = [
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
    ]
    return {
        snake: snakeCoordinates,
        fruit: getFruitRandomCoordinates(snakeCoordinates),
    }
}

export const Game = () => {
    const { snake: initialSnakeCoordinates, fruit: initialFruitCoordinates } =
        getInitialCoordinates()

    return (
        <Board
            initialSnakeCoordinates={initialSnakeCoordinates}
            initialFruitCoordinates={initialFruitCoordinates}
        />
    )
}
