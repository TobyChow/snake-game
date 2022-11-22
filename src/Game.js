import Board from './Board.js';
import {useState, useCallback} from 'react';

export default function Game({ restart }) {
    const [tickRate, setTickRate] = useState(150);
    const [isGameStart, setIsGameStart] = useState(false);

    const startGame = useCallback(() => {
        console.log('start');
        setIsGameStart(true);
    },[]);

    
    return (
        <>
            {tickRate}
            <Board isGameStart={isGameStart} startGame={startGame} restart={restart} tickRate={tickRate} setTickRate={setTickRate}/>
        </>
    );
}

