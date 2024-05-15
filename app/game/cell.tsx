import { cn } from '@/lib/utils'
import { BOARD_COLUMN_SIZE } from './board/board-constants'
import { getPositionFromCoordinates } from './game-utils'
import { Coordinate } from './snake/snake-types'

type CellProps = {
    children?: React.ReactNode
    className?: string
    coordinate: Coordinate
}

export const Cell = ({ children, className, coordinate }: CellProps) => {
    return (
        <div
            style={{
                ...getPositionFromCoordinates(coordinate.x, coordinate.y),
                height: BOARD_COLUMN_SIZE,
                width: BOARD_COLUMN_SIZE,
            }}
            className="absolute"
        >
            <div
                className={cn('absolute flex h-full w-full rounded-md', className)}
                style={{ height: BOARD_COLUMN_SIZE - 4, width: BOARD_COLUMN_SIZE - 4 }}
            >
                {children}
            </div>
        </div>
    )
}
