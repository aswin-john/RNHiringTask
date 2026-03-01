import { useState, useEffect } from 'react';

/**
 * Returns a debounced version of the value after the given delay (ms).
 * Useful for delaying search API calls until the user stops typing.
 */
const useDebounce = (value, delay = 400) => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debounced;
};

export default useDebounce;
