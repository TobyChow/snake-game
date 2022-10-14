import { BOARD_SIZE } from './Board.js';

export function incrementCellID(cellId) {
    const [ row, col ] = cellId.split('-');
    return `${row}-${Number(col)+1}`;
}