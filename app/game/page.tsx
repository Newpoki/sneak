'use client'

import { useCallback, useEffect, useState } from 'react'
import { Board } from './board/board'
import { getFruitRandomCoordinates } from './game-utils'
import { useGame } from './use-game'
import { PauseDialog } from './pause-dialog'
import { GameOverDialog } from './game-over-dialog'
import { useRouter } from 'next/navigation'
import { PauseCircle } from 'lucide-react'

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

    const router = useRouter()

    const { snake: initialSnakeCoordinates, fruit: initialFruitCoordinates } =
        getInitialCoordinates()

    const {
        fruitCoordinates,
        snakeCoordinates,
        direction,
        score,
        isPaused,
        isGameOver,
        onReset,
        onResume,
        onPause,
    } = useGame({
        initialFruitCoordinates,
        initialSnakeCoordinates,
    })

    const handleGoToHome = useCallback(() => {
        router.push('/')
    }, [router])

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
        <section className="relative flex flex-1 flex-col items-center justify-center gap-6 bg-slate-500 p-4">
            <button className="absolute left-4 top-4" onClick={onPause} type="button">
                <PauseCircle className="h-10 w-10 " />
            </button>

            <Board
                direction={direction}
                fruitCoordinates={fruitCoordinates}
                snakeCoordinates={snakeCoordinates}
            />
            <h3 className="text-3xl">Score: {score}</h3>

            <PauseDialog isOpen={isPaused} onResume={onResume} />
            <GameOverDialog
                isOpen={isGameOver}
                score={score}
                onTryAgain={onReset}
                onQuit={handleGoToHome}
            />
        </section>
    )
}
