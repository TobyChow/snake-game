const TICK_RATE = {
    'easy': 125,
    'medium': 100,
    'hard': 75,
}
const buttonContainerStyle = {
    display:'flex',
    justifyContent:'space-between'
}



function Button({ text, handleOnClick, cssOptions }) {
    const buttonStyle = {
        width:'75px',
        height:'75px',
        textTransform:'uppercase',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'600',
        margin:'0 25px',
        cursor:'pointer',
        ...cssOptions,
    }

    return (
        <div style={buttonStyle} onClick={handleOnClick}>
            {text}
        </div>
    );
}

export default function SelectDifficulty({ score, handleDifficultySelect }) {
    return (
    <div>
        <h1 style={{textAlign:'center'}}>Score: {score}</h1>
        <h1 style={{textAlign:'center'}}>Select Difficulty</h1>
        <div style={buttonContainerStyle}>
            <Button 
                text='easy' 
                handleOnClick={() => handleDifficultySelect(TICK_RATE['easy'])}
                cssOptions={{
                    border:'5px solid green',
                    background:'#1a2e1c'
                }}
            />
            <Button 
                text='medium' 
                handleOnClick={() => handleDifficultySelect(TICK_RATE['medium'])}
                cssOptions={{
                    border:'5px solid yellow',
                    background:'#30301b'
                }}
            />
            <Button 
                text='hard' 
                handleOnClick={() => handleDifficultySelect(TICK_RATE['hard'])}
                cssOptions={{
                    border:'5px solid red',
                    background:'#422222'
                }}
            />
            {/* <button onClick={() => handleDifficultySelect(TICK_RATE['easy'])}>Easy</button> */}
            {/* <button onClick={() => handleDifficultySelect(TICK_RATE['medium'])}>Medium</button> */}
            {/* <button onClick={() => handleDifficultySelect(TICK_RATE['hard'])}>Hard</button> */}
        </div>
    </div>
    );
}