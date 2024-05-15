import { cn } from '@/lib/utils'
import { Coordinate } from './snake-types'
import { BOARD_COLUMN_SIZE } from '../board/board-constants'
import { getPositionFromCoordinates } from '../game-utils'

type SnakeProps = {
    coordinates: Array<Coordinate>
}

export const Snake = ({ coordinates }: SnakeProps) => {
    return (
        <>
            {coordinates.map((coordinate, index) => {
                const isHeadCell = index === 0

                return (
                    <div
                        key={`${coordinate.x}-${coordinate.y}`}
                        className={cn('absolute bg-slate-300', {
                            'bg-slate-400': isHeadCell,
                        })}
                        style={{
                            height: BOARD_COLUMN_SIZE,
                            width: BOARD_COLUMN_SIZE,
                            ...getPositionFromCoordinates(coordinate.x, coordinate.y),
                        }}
                    />
                )
            })}
        </>
    )
}