import { useCallback, useEffect, useState } from 'react'
import { Coordinate, Direction } from './snake/snake-types'
import { BOARD_COLUMN_NUMBER } from './board/board-constants'
import { getFruitRandomCoordinates } from './game-utils'
import { FRUITS_SCORE } from './game-constants'

type UseGameProps = {
    initialSnakeCoordinates: Coordinate[]
    initialFruitCoordinates: Coordinate
}

export const useGame = ({ initialSnakeCoordinates, initialFruitCoordinates }: UseGameProps) => {
    const [isGameOver, setIsGameOver] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [snakeCoordinates, setSnakeCoordinates] = useState(initialSnakeCoordinates)
    const [fruitCoordinates, setFruitCoordinates] = useState(initialFruitCoordinates)
    const [score, setScore] = useState(0)

    const [direction, setDirection] = useState<Direction>('RIGHT')

    // When the snake eats a fruit, we need to add a new cell to the snake, generate a new fruit and increase the score
    const handleEatFruit = useCallback(
        (newHeadCoordinates: Coordinate) => {
            const newSnakeCoordinates = [newHeadCoordinates, ...snakeCoordinates]

            const newFruitCoordinates = getFruitRandomCoordinates(snakeCoordinates)

            setSnakeCoordinates(newSnakeCoordinates)
            setFruitCoordinates(newFruitCoordinates)
            setScore((prevScore) => prevScore + FRUITS_SCORE)
        },
        [snakeCoordinates]
    )

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
            handleEatFruit(newHeadCoordinates)

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

        const registerPause = (event: DocumentEventMap['keydown']) => {
            if (event.key === 'Escape' && !isPaused) {
                setIsPaused((prevIsPaused) => !prevIsPaused)
            }
        }

        document.addEventListener('keydown', registerMovements)
        document.addEventListener('keydown', registerPause)

        return () => {
            document.removeEventListener('keydown', registerMovements)
            document.removeEventListener('keydown', registerPause)
        }
    }, [direction, isPaused])

    useEffect(() => {
        const gameTick = setInterval(() => {
            if (isGameOver || isPaused) {
                return
            }

            moveSnake()
        }, 100)

        return () => {
            clearInterval(gameTick)
        }
    }, [isGameOver, isPaused, moveSnake])

    return {
        fruitCoordinates,
        snakeCoordinates,
        direction,
        score,
        isPaused,
        setIsPaused,
    }
}
