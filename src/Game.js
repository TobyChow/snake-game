import Board from './Board.js';
import {useState, useCallback} from 'react';

const scoreStyle = {
    fontSize: '3rem',
    fontWeight: 500
}

export default function Game() {
    const [score, setScore] = useState(0);
    const [tickRate, setTickRate] = useState(150);
    const [isGameStart, setIsGameStart] = useState(false);
    const [gameId, setGameId] = useState(Math.random());

    const startGame = useCallback(() => {
        setIsGameStart(true);
        setScore(0);
        setGameId(Math.random());
    },[]);

    const endGame = useCallback(() => {
        setIsGameStart(false);
    },[]);

    return (
        <div className='game-container'>
            <div className='score-container' style={scoreStyle}>Score: {score}</div>
            <Board key={gameId}
                isGameStart={isGameStart}
                startGame={startGame}
                endGame={endGame}
                tickRate={tickRate}
                setTickRate={setTickRate}
                setScore={setScore}
            />
        </div>
    );
}

