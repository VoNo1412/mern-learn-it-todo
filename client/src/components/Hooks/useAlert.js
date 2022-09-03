import {useState, useEffect} from 'react'

const useAlert = () => {
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        const timeoutAlert = setTimeout(() => setAlert(null), 1000);

        return () => clearTimeout(timeoutAlert);
    }, [alert]);

    return [alert, setAlert];
}

export default useAlert