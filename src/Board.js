import {useEffect, useState, useRef} from 'react';
import { useInterval } from './Util.js';
import Snake from './Snake.js';

const BOARD_SIZE = 20; // number of cells per row / col
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

const tickRate = 1000; // milliseconds, 100 or 150 is good

function Board() {
    const [snake, setSnake] = useState(() => {
        const snake = new Snake('5-3', 'RIGHT');
        snake.grow('5-2', 'RIGHT');
        snake.grow('5-1', 'RIGHT');
        return snake;
    });

    const [snakeCells, setSnakeCells] = useState(snake.cells);

    const [foodCell, setFoodCell] = useState(['6-5']);

    const [direction, setDirection] = useState(SNAKE_DIRECTION.RIGHT);

    const [board, setBoard] = useState(() => {
        return createBoard({
            snake: snake.cells,
            snake__head: [snake.head.val],
            food: foodCell
        });
    });


    /*
    const gameTick = useRef();
    useEffect(() => {
        gameTick.current = setInterval(() => {
            handleMove();
        }, tickRate)
        return ()=>clearInterval(gameTick.current);
    },[snake, snakeCells, direction, foodCell]);
    */

    useInterval(() => {
        handleMove();
    }, 1000);

    const d = useRef(SNAKE_DIRECTION.RIGHT);

    useEffect(() => {
        const handleKeydown = e => {
            const key = e.key;
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
    },[direction]);

    function handleMove() {
        d.current = direction;

        const newHeadCoord = getDirection(snake.head.val, direction);
        // check new coord for collision
        // todo combine collision checker
        const isCollision = checkBoardCollision(newHeadCoord);
        if (isCollision) {
            console.log('board');
            return; //todo gameover
        }
        if (checkSnakeCollision(newHeadCoord)) {
            console.log('self');
            return; //todo gameover
        }

        let hasConsumedFood = false;
        if (checkFoodCollision(newHeadCoord)) {
            console.log('eat food');
            hasConsumedFood = true;
            handleEat();
            spawnFood();
        }

        snake.move(newHeadCoord, direction);
        setSnake(snake);
        setSnakeCells(new Set(snake.cells));
        /*
        setBoard(createBoard({
            snake: snake.cells,
            snake__head: [snake.head.val],
            food: hasConsumedFood ? [] : foodCell,
        }));
        */
    }

    function handleEat() {
        // use opposite direction of tail to determine where to add new tail
        const positionToAddTail = getDirection(snake.tail.val, SNAKE_DIRECTION_OPPOSITE[snake.tail.direction]);

        // prevent extending snake past border
        // todo edge case
        if (checkBoardCollision(positionToAddTail)) {
            return;
        } else {
            snake.grow(positionToAddTail, snake.tail.direction);
            setSnake(snake);
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

    
    function spawnFood() {
        let randomCell = getRandomCell();
        while (snake.cells.has(randomCell)) {
            randomCell = getRandomCell();
        }
        setFoodCell([randomCell]);
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
                let cellId = `${i}-${j}`;
                board.push(cellId);
            }
        }
        return board;
    }

    const entities = entitiesToCoords({
        snake: snakeCells,
        snake__head: [snake.head.val],
        food: [foodCell]
    }, d.current);

    return (
        <div>
            <button onClick={() => handleMove()}>manual move</button>
            <button onClick={() => handleEat()}>eat</button>
            <button onClick={() => spawnFood()}>food</button>
            {direction}
            <div id="board" style={{width:BOARD_WIDTH}}>
                {board.map(cell => {
                    let className = 'cell';
                    if (entities[cell]) {
                        className += ' ' + entities[cell];
                    }
                    return <div key={cell} className={className}>{cell}</div>;
                })}
            </div>
        </div>
    );
}

function entitiesToCoords(boardEntities, direction = '') {
    const hash = {};
    for (let [boardEntity, targetCells] of Object.entries(boardEntities)) {
        targetCells.forEach(targetCell => {
            if (boardEntity === 'snake__head') {
                boardEntity += ' snake__head--' + direction;
            }
            
            if (!hash[targetCell]) {
                hash[targetCell] = ' ' + boardEntity;
            } else {
                hash[targetCell] += ' ' + boardEntity;
            }
        });
    }
    return hash;
}



//todo comment
function getRandomCell() {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
    }

    return `${getRandomInt(1, BOARD_SIZE)}-${getRandomInt(1, BOARD_SIZE)}`;
}


export default Board;
