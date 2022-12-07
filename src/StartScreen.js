import {useState, memo} from 'react';
import Countdown from './Countdown.js';
import SelectDifficulty from './SelectDifficulty.js';

const style = {
    background: 'rgba(0,0,0,0.9)',
    color:'white',
    position:'absolute',
    width:'100%',
    height:'100%',
    display:'flex',
    flexFlow:'column',
    justifyContent:'center',
    alignItems:'center',
    zIndex:2,
};

const StartScreen = memo(function StartScreen({ handleStart, setTickRate }) {
    const [showCountdown, setShowCountdown] = useState(false);

    function handleDifficultySelect(tickRate) {
        setTickRate(tickRate);
        setShowCountdown(true);
    }

    return (
        <>
        <div style={style}>
            {showCountdown ? <Countdown callback={(handleStart)}/> : <SelectDifficulty handleDifficultySelect={handleDifficultySelect}/>}
        </div>
        </>
    );
});

export default StartScreen;