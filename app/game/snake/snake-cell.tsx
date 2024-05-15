import { cn } from '@/lib/utils'
import { Coordinate, Direction } from './snake-types'
import { Cell } from '../cell'

type SnakeCellPropos = {
    coordinate: Coordinate
    isHeadCell?: boolean
    direction?: Direction
}

export const SnakeCell = ({
    coordinate,
    isHeadCell = false,
    direction = 'UP',
}: SnakeCellPropos) => {
    return (
        <Cell
            coordinate={coordinate}
            className={cn('bg-green-300', { 'bg-green-500': isHeadCell })}
        >
            {isHeadCell && (
                <div
                    className={cn('relative flex w-full justify-center gap-2 py-1', {
                        'items-end': direction === 'BOTTOM',
                    })}
                >
                    <div className="h-1/3 w-1/12 rounded-full bg-black " />
                    <div className="h-1/3 w-1/12 rounded-full bg-black " />
                </div>
            )}
        </Cell>
    )
}
