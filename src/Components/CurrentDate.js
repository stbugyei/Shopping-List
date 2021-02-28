import { useState, useEffect } from "react";

const CurrentDate = () => {

    const [localTime, setLocalTime] = useState();

    const currentDate = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone:"Europe/Helsinki" };
    const presentDay = currentDate.toLocaleDateString('default', options);
 
    useEffect(() => {

        const reset = setInterval(() => setLocalTime(presentDay), 1000)
        return () => {
            clearInterval(reset);
        }

    }, [presentDay])

 

    return {
        localTime,
    }
}

export default CurrentDate