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

const StartScreen = memo(function StartScreen({ handleStart, setTickRate }) {
    console.log('render start');
    const [showCountdown, setShowCountdown] = useState(false);

    function handleDifficultySelect() {
        setTickRate(150);
        setShowCountdown(true);
    }

    function SelectDifficulty() {
        return (
            <button onClick={handleDifficultySelect}>a</button>
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