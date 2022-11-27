import Board from './Board.js';
import {useState, useCallback} from 'react';

export default function Game() {
    const [score, setScore] = useState(0);
    const [tickRate, setTickRate] = useState(150);
    const [isGameStart, setIsGameStart] = useState(true);//todo set false
    const [gameId, setGameId] = useState(Math.random());

    const startGame = useCallback(() => {
        console.log('start');
        setIsGameStart(true);
        setScore(0);
        setGameId(Math.random());
    },[]);

    const endGame = useCallback(() => {
        setIsGameStart(false);
    },[]);

    
    return (
        <>
            {tickRate}
            {score}
            <Board key={gameId} isGameStart={isGameStart} startGame={startGame} endGame={endGame} tickRate={tickRate} setTickRate={setTickRate} score={score} setScore={setScore}/>
        </>
    );
}

