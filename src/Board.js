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

const tickRate = 200; // milliseconds, 100 or 150 is good

function Board() {
    const [snake, setSnake] = useState(() => {
        const snake = new Snake('5-3', 'RIGHT');
        snake.grow('5-2', 'RIGHT');
        snake.grow('5-1', 'RIGHT');
        return snake;
    });

    const [direction, setDirection] = useState(SNAKE_DIRECTION.RIGHT);

    const [board, setBoard] = useState(() => {
        return createBoard(snake.toArray(), 'snake');
    });

    const gameTick = useRef();

    useEffect(() => {
        gameTick.current = setInterval(() => {
            // handleMove();
            console.log('tick');
        }, tickRate)
        return ()=>clearInterval(gameTick.current);
    },[]);

    useEffect(() => {
        const handleKeydown = e => {
            const key = e.key;
            console.log(key, direction);
            if (key === 'ArrowLeft' && direction !== 'RIGHT') {
                setDirection(SNAKE_DIRECTION.LEFT);
            } else if (key === 'ArrowRight' && direction !== 'LEFT') {
                setDirection(SNAKE_DIRECTION.RIGHT);
            } else if (key === 'ArrowUp' && direction !== 'DOWN') {
                setDirection(SNAKE_DIRECTION.UP);
            } else if (key === 'ArrowDown' && direction !== 'UP') {
                setDirection(SNAKE_DIRECTION.DOWN);
            }
        }
        
        window.addEventListener('keydown', handleKeydown);
        return () => window.removeEventListener('keydown', handleKeydown);
    },[direction]);

    function setSnakeToBoard(target) {
        return setBoard(createBoard(target, 'snake'));
    }

    function handleMove() {
        const newHeadCoord = getDirection(snake.head.val, direction);
        // check new coord for collision
        const isCollision = checkBoardCollision(newHeadCoord);
        console.log(isCollision, newHeadCoord);
        if (isCollision) {
            return;
        }
        snake.move(newHeadCoord, direction);
        setSnake(snake);
        return setSnakeToBoard(snake.toArray());
    }

    function handleEat() {
        // use opposite direction of tail to determine where to add new tail
        const positionToAddTail = getDirection(snake.tail.val, SNAKE_DIRECTION_OPPOSITE[snake.tail.direction]);
        snake.grow(positionToAddTail, snake.tail.direction);
        setSnake(snake);
        setSnakeToBoard(snake.toArray());
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

    function checkBoardCollision(coord) {
        let [row, col] = coord.split('-');
        row = Number(row);
        col = Number(col);
        return row < 1 || row > BOARD_SIZE || col < 1 || col > BOARD_SIZE;
    }

    function checkSnakeCollision(snake, coord) {
        
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
