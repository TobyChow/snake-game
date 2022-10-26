import {useEffect, useState, useRef} from 'react';
import { useInterval } from './Util.js';
import Snake from './Snake.js';

const BOARD_SIZE = 10; // number of cells per row / col
const CELL_SIZE = 50; //px
const BOARD_WIDTH = BOARD_SIZE * CELL_SIZE;
const SNAKE_DIRECTION = {
    'LEFT': 'LEFT',
    'RIGHT': 'RIGHT',
    'UP': 'UP',
    'DOWN': 'DOWN'
};
const SNAKE_DIRECTION_OPPOSITE = {
    'LEFT': 'RIGHT',
    'RIGHT': 'LEFT',
    'UP': 'DOWN',
    'DOWN': 'UP'
};

const tickRate = 500; // milliseconds

function Board() {
    const [snake, setSnake] = useState(() => {
        const snake = new Snake();
        snake.grow('3-4');
        snake.grow('2-4');
        snake.grow('1-4');
        return snake;
    });

    const [direction, setDirection] = useState(SNAKE_DIRECTION.RIGHT);

    const [board, setBoard] = useState(() => {
        return createBoard(snake.toArray(), 'snake');
    });

    const gameTick = useRef();

    useEffect(() => {
        gameTick.current = setInterval(() => {
            console.log('a');
            // handleMove();
        }, tickRate)
        return ()=>clearInterval(gameTick.current);
    });

    useEffect(() => {
        window.addEventListener('keydown', e => {
           handleKeydown(e); 
        });
    });

    function setSnakeToBoard(target) {
        return setBoard(createBoard(target, 'snake'));
    }

    function handleMove() {
        const newHeadCoord = getDirection(snake.head.val, direction);
        snake.move(newHeadCoord);
        setSnake(snake);
        return setSnakeToBoard(snake.toArray());
    }

    function handleEat() {
        // use opposite direction of head to determine where to add tail
        const positionToAddTail = getDirection(snake.tail.val, SNAKE_DIRECTION_OPPOSITE[direction]);
        console.log(snake.tail);
        snake.grow(positionToAddTail);
        setSnake(snake);
        setSnakeToBoard(snake.toArray());
    }

    const handleKeydown = e => {
        const key = e.key;
        switch (key) {
            case 'ArrowUp':
                setDirection(SNAKE_DIRECTION.UP);
                break;
            case 'ArrowRight':
                setDirection(SNAKE_DIRECTION.RIGHT);
                break;
            case 'ArrowDown':
                setDirection(SNAKE_DIRECTION.DOWN);
                break;
            case 'ArrowLeft':
                setDirection(SNAKE_DIRECTION.LEFT);
                break;
            default:
                break;
        }
    }

    function getDirection(currentPosition, direction) {
        let [row, col] = currentPosition.split('-');
        switch (direction) {
            case 'UP':
                row = Number(row) - 1;
                break;
            case 'RIGHT':
                col = Number(col) + 1;
                break;
            case 'DOWN':
                row = Number(row) + 1;
                break;
            case 'LEFT':
                col = Number(col) - 1;
                break;
            default:
                break;
        }
        return `${row}-${col}`;
    }

    return (
        <div>
            <button onClick={() => handleMove()}>manual move</button>
            <button onClick={() => handleEat()}>eat</button>
            {direction}
            <div id="board" style={{width:BOARD_WIDTH}}>
                {board}
            </div>
        </div>
    );
}

/**
 * 
 * @param {string[]} target - cell coordinates to apply className to
 * @param {string} className - html class name to apply
 * @returns 
 */
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
