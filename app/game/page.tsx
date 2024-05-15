'use client'

import { useEffect, useState } from 'react'
import { Board } from './board/board'
import { getFruitRandomCoordinates } from './game-utils'
import { useGame } from './use-game'

const getInitialCoordinates = () => {
    const snakeCoordinates = [
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },
    ]
    return {
        snake: snakeCoordinates,
        fruit: getFruitRandomCoordinates(snakeCoordinates),
    }
}

export default function Game() {
    const [isMounted, setIsMounted] = useState(false)

    const { snake: initialSnakeCoordinates, fruit: initialFruitCoordinates } =
        getInitialCoordinates()

    const { fruitCoordinates, snakeCoordinates, direction, score } = useGame({
        initialFruitCoordinates,
        initialSnakeCoordinates,
    })

    useEffect(() => {
        setIsMounted(true)
    }, [])

    // We don't want to display the game if it's not mounted
    // Otherwise we can have hydratation issues with the fruit initial coordinates
    if (isMounted === false) {
        // TODO: Display a cool loader
        return null
    }

    return (
        <section className="flex flex-1 flex-col items-center justify-center gap-6 bg-slate-500 p-4">
            <Board
                direction={direction}
                fruitCoordinates={fruitCoordinates}
                snakeCoordinates={snakeCoordinates}
            />
            <h3 className="text-3xl">Score: {score}</h3>
        </section>
    )
}
