import { useState } from 'react'

export const useGame = () => {
    const [isGameOver, setIsGameOver] = useState(false)
    const [fruitCoordinates, setFruitCoordinates] = useState({ x: 10, y: 10 })

    return {
        isGameOver,
        setIsGameOver,
        fruitCoordinates,
    }
}
