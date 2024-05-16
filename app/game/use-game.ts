import { useCallback, useEffect, useState } from 'react'
import { Coordinate, Direction } from './snake/snake-types'
import { BOARD_COLUMN_NUMBER } from './board/board-constants'
import { getFruitRandomCoordinates } from './game-utils'
import { FRUITS_SCORE } from './game-constants'
import { GameStatus } from './game-types'

type UseGameProps = {
    initialSnakeCoordinates: Coordinate[]
    initialFruitCoordinates: Coordinate
}

export const useGame = ({ initialSnakeCoordinates, initialFruitCoordinates }: UseGameProps) => {
    const [gameStatus, setGameStatus] = useState<GameStatus>('STARTING')
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
            setGameStatus('GAME_OVER')
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

    // Reset all states but the fruit coordinate to their initial state
    // We want a different fruit coordinate when the game restarts
    const handleReset = useCallback(() => {
        setGameStatus('STARTING')
        setSnakeCoordinates(initialSnakeCoordinates)
        setFruitCoordinates(getFruitRandomCoordinates(initialSnakeCoordinates))
        setScore(0)
        setDirection('RIGHT')
    }, [initialSnakeCoordinates])

    const handlePauseGame = useCallback(() => {
        setGameStatus('PAUSED')
    }, [])

    const handleResumeGame = useCallback(() => {
        setGameStatus('RUNNING')
    }, [])

    const handleStartGame = useCallback(() => {
        setGameStatus('RUNNING')
    }, [])

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
            if (event.key === 'Escape' && gameStatus === 'RUNNING') {
                setGameStatus('PAUSED')
            }
        }

        document.addEventListener('keydown', registerMovements)
        document.addEventListener('keydown', registerPause)

        return () => {
            document.removeEventListener('keydown', registerMovements)
            document.removeEventListener('keydown', registerPause)
        }
    }, [direction, gameStatus])

    useEffect(() => {
        const gameTick = setInterval(() => {
            if (gameStatus !== 'RUNNING') {
                return
            }

            moveSnake()
        }, 100)

        return () => {
            clearInterval(gameTick)
        }
    }, [gameStatus, moveSnake])

    return {
        fruitCoordinates,
        snakeCoordinates,
        direction,
        score,
        gameStatus,
        onReset: handleReset,
        onPause: handlePauseGame,
        onResume: handleResumeGame,
        onStart: handleStartGame,
    }
}
