import {useState, useEffect, useRef} from "react";

export default function Countdown({ callback }) {
    const [countdown, setCountdown] = useState(3);

    const intervalId = useRef();
    useEffect(() => {
        intervalId.current = setInterval(() => {
            setCountdown(c=>--c);    
        }, 1000);

        if (countdown === 0) {
            clearInterval(intervalId.current);
            callback();
        };

        return ()=>clearInterval(intervalId.current);
    }, [countdown, callback]);

    return (
        <>
        {countdown === 0 ? null : <div>{countdown}</div>}
        </>
    );
}