import { Button } from '@/components/ui/button'
import { BOARD_COLUMN_SIZE } from './game/board/board-constants'
import { SnakeCell } from './game/snake/snake-cell'

export default function Home() {
    return (
        <main className="flex min-h-[100dvh] flex-col items-center gap-6 p-8">
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

            <h1 className="text-accent text-5xl font-bold uppercase">Sneak</h1>

            <Button>Play</Button>
        </main>
    )
}
