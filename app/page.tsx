'use client'

import { Button } from '@/components/ui/button'
import { BOARD_COLUMN_SIZE } from './game/board/board-constants'
import { SnakeCell } from './game/snake/snake-cell'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { motion } from 'framer-motion'
import { useCallback } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter()

    const handleStartGame = useCallback(() => {
        router.push('/game')
    }, [router])

    return (
        <AuroraBackground className="justify-start px-6 py-8">
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: 'easeInOut',
                }}
                className="relative flex w-full flex-col items-center gap-4 "
            >
                <section
                    className="relative"
                    style={{ height: 5 * BOARD_COLUMN_SIZE, width: 3 * BOARD_COLUMN_SIZE }}
                >
                    <SnakeCell coordinate={{ x: 0, y: 0 }} />
                    <SnakeCell coordinate={{ x: 1, y: 0 }} />
                    <SnakeCell coordinate={{ x: 2, y: 0 }} />
                    <SnakeCell coordinate={{ x: 0, y: 1 }} />
                    <SnakeCell coordinate={{ x: 0, y: 2 }} />
                    <SnakeCell coordinate={{ x: 1, y: 2 }} />
                    <SnakeCell coordinate={{ x: 2, y: 2 }} />
                    <SnakeCell coordinate={{ x: 2, y: 3 }} />
                    <SnakeCell coordinate={{ x: 2, y: 4 }} />
                    <SnakeCell coordinate={{ x: 1, y: 4 }} />
                    <SnakeCell isHeadCell coordinate={{ x: 0, y: 4 }} />
                </section>

                <h1 className="text-5xl font-bold uppercase text-accent">Sneak</h1>

                <section className="w-full max-w-[400px]">
                    <Button className="w-full" onClick={handleStartGame}>
                        Play
                    </Button>
                </section>
            </motion.div>
        </AuroraBackground>
    )
}
