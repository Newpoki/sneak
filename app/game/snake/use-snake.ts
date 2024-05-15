import { useCallback, useEffect, useState } from 'react'
import { Direction } from './snake-types'
import { BOARD_COLUMN_NUMBER } from '../board/board-constants'

export const useSnake = () => {
    const [direction, setDirection] = useState<Direction>('RIGHT')
    const [coordinates, setCoordinates] = useState([
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
    ])

    /**
     * Moving the snake is basically moving the head to the direction and removing the last cell
     */
    const moveSnake = useCallback(() => {
        const headCoordinates = coordinates[0]

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

        const isEatingItself = coordinates.some(
            (coordinate) =>
                coordinate.x === newHeadCoordinates.x && coordinate.y === newHeadCoordinates.y
        )

        if (isExceedingBoardBoundaries || isEatingItself) {
            throw new Error('GG EZ')
        }

        setCoordinates([newHeadCoordinates, ...coordinates.slice(0, -1)])
    }, [coordinates, direction])

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
            moveSnake()
        }, 100)

        return () => {
            clearInterval(gameTick)
        }
    }, [moveSnake])

    return {
        coordinates,
        direction,
    }
}
