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

const tickRate = 100; // milliseconds, 100 or 150 is good

function Board() {
    const [snake, setSnake] = useState(() => {
        const snake = new Snake('5-3', 'RIGHT');
        snake.grow('5-2', 'RIGHT');
        snake.grow('5-1', 'RIGHT');
        return snake;
    });

    const [foodCell, setFoodCell] = useState(['6-5']);

    const [direction, setDirection] = useState(SNAKE_DIRECTION.RIGHT);

    const [board, setBoard] = useState(() => {
        return createBoard({
            snake: snake.toArray(),
            food: foodCell
        });
    });

    const gameTick = useRef();

    useEffect(() => {
        gameTick.current = setInterval(() => {
            //handleMove();
            console.log('tick');
        }, tickRate)
        return ()=>clearInterval(gameTick.current);
    },[snake, direction, foodCell]);

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
        
        document.addEventListener('keydown', handleKeydown);
        return () => document.removeEventListener('keydown', handleKeydown);
    },[direction]);

    function handleMove() {
        const newHeadCoord = getDirection(snake.head.val, direction);
        // check new coord for collision
        // todo combine collision checker
        const isCollision = checkBoardCollision(newHeadCoord);
        if (isCollision) {
            console.log(isCollision, newHeadCoord);
            return; //todo gameover
        }
        if (checkSnakeCollision(newHeadCoord)) {
            console.log('self');
            return; //todo gameover
        }

        let hasConsumedFood = false;
        if (checkFoodCollision(newHeadCoord)) {
            console.log('eat food');
            setFoodCell([]);
            setBoard(createBoard({
                snake: snake.toArray(),
                food: [],
            }));
            hasConsumedFood = true;
            handleEat();
        }

        snake.move(newHeadCoord, direction);
        setSnake(snake);
        setBoard(createBoard({
            snake: snake.toArray(),
            food: hasConsumedFood ? [] : foodCell,
        }));
    }

    function handleEat() {
        // use opposite direction of tail to determine where to add new tail
        const positionToAddTail = getDirection(snake.tail.val, SNAKE_DIRECTION_OPPOSITE[snake.tail.direction]);

        // prevent extending snake past border
        if (checkBoardCollision(positionToAddTail)) {
            console.log('tail exceeds border');
            return;
        } else {
            snake.grow(positionToAddTail, snake.tail.direction);
            setSnake(snake);
            setBoard(createBoard({
                snake: snake.toArray(),
                food: foodCell,
            }));
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

    function checkBoardCollision(coord) {
        let [row, col] = coord.split('-');
        row = Number(row);
        col = Number(col);
        return row < 1 || row > BOARD_SIZE || col < 1 || col > BOARD_SIZE;
    }

    function checkSnakeCollision(coord) {
        return snake.cells.has(coord);
    }

    function checkFoodCollision(coord) {
        return foodCell.includes(coord);
    }

    //todo randomly spawn food
    function spawnFood() {
        
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
function createBoard(boardEntities) {
    let board = [];
    for (let i=1; i<=BOARD_SIZE; i++) {
        for (let j=1; j<=BOARD_SIZE; j++) {
            let cellClass = 'cell';
            let cellId = `${i}-${j}`;
            // todo
            for (const [boardEntity, targetCells] of Object.entries(boardEntities)) {
                if (targetCells.includes(cellId)) {
                    cellClass += ' ' + boardEntity;
                }
            }
            board.push(<div style={{width:CELL_SIZE, height:CELL_SIZE}} id={cellId} className={cellClass} key={`${i}-${j}`} row={i} col={j}>{`${i} ${j}`}</div>);
        }
    }
    return board;
}

export default Board;
