import { Coordinate } from './snake/snake-types'
import { Cell } from './cell'

type FruitProps = {
    coordinate: Coordinate
}

export const Fruit = ({ coordinate }: FruitProps) => {
    return <Cell coordinate={coordinate} className="bg-red-500" />
}
