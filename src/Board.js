import {useEffect, useState} from 'react';
import Snake from './Snake.js';

const BOARD_SIZE = 10; // number of cells per row / col
const CELL_SIZE = 50; //px
const BOARD_WIDTH = BOARD_SIZE * CELL_SIZE;
const SNAKE_DIRECTION = {
    'LEFT': 'left',
    'RIGHT': 'right',
    'UP': 'up',
    'DOWN': 'down'
};
const tickRate = 1000; // milliseconds

function Board() {
    const [snake, setSnake] = useState(() => {
        const snake = new Snake();
        snake.grow('1-3');
        snake.grow('1-2');
        snake.grow('1-1');
        return snake;
    });

    const [board, setBoard] = useState(() => {
        return createBoard(snake.toArray(), 'snake');
    });

    useEffect(() => {
        setInterval(() => {
            console.log('a'); // todo remove
        }, tickRate);
    });

    function setSnakeToBoard(target) {
        return setBoard(createBoard(target, 'snake'));
    }

    function handleMove() {
        const newHeadCoord = handleDirection('right');
        snake.move(newHeadCoord);
        setSnake(snake);
        return setSnakeToBoard(snake.toArray());
    }

    function handleDirection(direction) {
        const headCoord = snake.head.val;
        let [row, col] = headCoord.split('-');
        switch (direction) {
            case 'up':
                row = Number(row) - 1;
                break;
            case 'right':
                col = Number(col) + 1;
                break;
            case 'down':
                row = Number(row) + 1;
                break;
            case 'left':
                row = Number(col) - 1;
            default:
                break;
        }
        return `${row}-${col}`;
    }

    return (
        <div>
            <button onClick={() => handleMove()}>manual move</button>
            <div id="board" style={{width:BOARD_WIDTH}}>
                {board}
            </div>
        </div>
    );
}

function createBoard(target=[], className=null) {
    let board = [];
    for (let i=1; i<=BOARD_SIZE; i++) {
        for (let j=1; j<=BOARD_SIZE; j++) {
            let cellClass = 'cell';
            let cellId = `${i}-${j}`;
            if (target.includes(cellId)) {
                cellClass += ' ' + className;
            }
            board.push(<div style={{width:CELL_SIZE, height:CELL_SIZE}} id={cellId} className={cellClass} key={`${i}-${j}`} row={i} col={j}>{`${i} ${j}`}</div>);
        }
    }
    return board;
}

export default Board;
