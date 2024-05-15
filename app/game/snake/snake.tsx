import { Coordinate, Direction } from './snake-types'
import { SnakeCell } from './snake-cell'

type SnakeProps = {
    coordinates: Array<Coordinate>
    direction: Direction
}

export const Snake = ({ coordinates, direction }: SnakeProps) => {
    return (
        <>
            {coordinates.map((coordinate, index) => {
                const isHeadCell = index === 0

                return (
                    <SnakeCell
                        isHeadCell={isHeadCell}
                        key={`${coordinate.x}-${coordinate.y}`}
                        coordinate={coordinate}
                        direction={direction}
                    />
                )
            })}
        </>
    )
}
