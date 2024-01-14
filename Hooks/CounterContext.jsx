// CounterContext.js

import { createContext, useContext, useState } from 'react';

const CounterContext = createContext();

export const CounterProvider = ({ children }) => {
    const [counter, setCounter] = useState(1);

    const handleDecrement = () => {
        setCounter((prevCounter) => Math.max(1, prevCounter - 1));
    };

    const handleIncrement = () => {
        setCounter((prevCounter) => prevCounter + 1);
    };

    return (
        <CounterContext.Provider value={{ counter, handleDecrement, handleIncrement }}>
            {children}
        </CounterContext.Provider>
    );
};

export const useCounter = () => {
    const context = useContext(CounterContext);
    if (!context) {
        throw new Error('useCounter must be used within a CounterProvider');
    }
    return context;
};
