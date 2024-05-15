import { cn } from '@/lib/utils'
import { Coordinate, Direction } from './snake-types'
import { BOARD_COLUMN_SIZE } from '../board/board-constants'
import { getPositionFromCoordinates } from '../game-utils'

type SnakeCellPropos = {
    coordinate: Coordinate
    isHeadCell: boolean
    direction: Direction
}

export const SnakeCell = ({ coordinate, isHeadCell, direction }: SnakeCellPropos) => {
    return (
        <div
            className={cn('absolute flex bg-slate-300', {
                'bg-slate-400': isHeadCell,
            })}
            style={{
                height: BOARD_COLUMN_SIZE,
                width: BOARD_COLUMN_SIZE,
                ...getPositionFromCoordinates(coordinate.x, coordinate.y),
            }}
        >
            {isHeadCell && (
                <div
                    className={cn('relative flex w-full justify-center gap-2 py-1', {
                        'mt-auto': direction === 'BOTTOM',
                    })}
                >
                    <div className="h-3 w-1 rounded-full bg-black " />
                    <div className="h-3 w-1 rounded-full bg-black " />
                </div>
            )}
        </div>
    )
}
