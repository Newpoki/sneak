import { useCallback, useEffect, useState } from 'react'
import { Coordinate, Direction } from './snake/snake-types'
import { BOARD_COLUMN_NUMBER } from './board/board-constants'
import { getFruitRandomCoordinates } from './game-utils'

type UseGameProps = {
    initialSnakeCoordinates: Coordinate[]
    initialFruitCoordinates: Coordinate
}

export const useGame = ({ initialSnakeCoordinates, initialFruitCoordinates }: UseGameProps) => {
    const [isGameOver, setIsGameOver] = useState(false)
    const [snakeCoordinates, setSnakeCoordinates] = useState(initialSnakeCoordinates)
    const [fruitCoordinates, setFruitCoordinates] = useState(initialFruitCoordinates)

    const [direction, setDirection] = useState<Direction>('RIGHT')

    // Generate the new fruit coordinates when the snake eats the fruit, excluding the snake's current coordinates
    const handleEatFruit = useCallback((snakeCoordinates: Coordinate[]) => {
        const newFruitCoordinates = getFruitRandomCoordinates(snakeCoordinates)

        setFruitCoordinates(newFruitCoordinates)
    }, [])

    /**
     * Moving the snake is basically moving the head to the direction and removing the last cell
     */
    const moveSnake = useCallback(() => {
        const headCoordinates = snakeCoordinates[0]

        const getNewHeadCoordinates = () => {
            switch (direction) {
                case 'UP':
                    return { x: headCoordinates.x, y: headCoordinates.y - 1 }

                case 'RIGHT':
                    return { x: headCoordinates.x + 1, y: headCoordinates.y }

                case 'BOTTOM':
                    return { x: headCoordinates.x, y: headCoordinates.y + 1 }

                case 'LEFT':
                    return { x: headCoordinates.x - 1, y: headCoordinates.y }
            }
        }

        const newHeadCoordinates = getNewHeadCoordinates()

        const isExceedingBoardBoundaries =
            newHeadCoordinates.x < 0 ||
            newHeadCoordinates.y < 0 ||
            newHeadCoordinates.x >= BOARD_COLUMN_NUMBER ||
            newHeadCoordinates.y >= BOARD_COLUMN_NUMBER

        const isEatingItself = snakeCoordinates.some(
            (coordinate) =>
                coordinate.x === newHeadCoordinates.x && coordinate.y === newHeadCoordinates.y
        )

        // We want to stop the game if the snake is exceeding the board boundaries or eating itself
        if (isExceedingBoardBoundaries || isEatingItself) {
            setIsGameOver(true)
            return
        }

        const isNowEatingFruit =
            newHeadCoordinates.x === fruitCoordinates.x &&
            newHeadCoordinates.y === fruitCoordinates.y

        if (isNowEatingFruit) {
            const newSnakeCoordinates = [newHeadCoordinates, ...snakeCoordinates]

            setSnakeCoordinates(newSnakeCoordinates)
            handleEatFruit(newSnakeCoordinates)

            return
        }

        setSnakeCoordinates([newHeadCoordinates, ...snakeCoordinates.slice(0, -1)])
    }, [snakeCoordinates, direction, fruitCoordinates.x, fruitCoordinates.y, handleEatFruit])

    useEffect(() => {
        const registerMovements = (event: DocumentEventMap['keydown']) => {
            switch (event.key) {
                case 'ArrowUp':
                    if (direction === 'BOTTOM') {
                        return
                    }

                    setDirection('UP')
                    return

                case 'ArrowRight':
                    if (direction === 'LEFT') {
                        return
                    }

                    setDirection('RIGHT')
                    return

                case 'ArrowDown':
                    if (direction === 'UP') {
                        return
                    }

                    setDirection('BOTTOM')
                    return

                case 'ArrowLeft':
                    if (direction === 'RIGHT') {
                        return
                    }

                    setDirection('LEFT')
                    return
            }
        }

        document.addEventListener('keydown', registerMovements)

        return () => {
            document.removeEventListener('keydown', registerMovements)
        }
    }, [direction])

    useEffect(() => {
        const gameTick = setInterval(() => {
            if (isGameOver) {
                return
            }

            moveSnake()
        }, 100)

        return () => {
            clearInterval(gameTick)
        }
    }, [isGameOver, moveSnake])

    return {
        fruitCoordinates,
        snakeCoordinates,
    }
}
