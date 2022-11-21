import {useState, memo} from 'react';
import Countdown from './Countdown.js';

const style = {
    border:'1px solid blue',
    background: 'rgba(0,0,0,0.8)',
    color:'white',
    position:'absolute',
    width:'100%',
    height:'100%',
}

const TICK_RATE = {
    'easy': 1000,
    'medium': 150,
    'hard': 1,
}

const StartScreen = memo(function StartScreen({ handleStart, setTickRate }) {
    console.log('render start');
    const [showCountdown, setShowCountdown] = useState(false);

    function handleDifficultySelect(tickRate) {
        setTickRate(tickRate);
        setShowCountdown(true);
    }

    function SelectDifficulty() {
        return (
        <>
            <button onClick={() => handleDifficultySelect(TICK_RATE['easy'])}>Easy</button>
            <button onClick={() => handleDifficultySelect(TICK_RATE['medium'])}>Medium</button>
            <button onClick={() => handleDifficultySelect(TICK_RATE['hard'])}>Hard</button>
        </>
        );
    }

    return (
        <>
        <div style={style}>
            {showCountdown ? <Countdown callback={(handleStart)}/> : <SelectDifficulty/>}
        </div>
        </>
    );
});

export default StartScreen;