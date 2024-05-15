import { BOARD_COLUMN_SIZE } from './board/board-constants'

export const getPositionFromCoordinates = (x: number, y: number) => {
    return {
        transform: `translate(${x * BOARD_COLUMN_SIZE}px, ${y * BOARD_COLUMN_SIZE}px)`,
    }
}
