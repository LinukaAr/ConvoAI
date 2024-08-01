import React, { useState, createContext } from 'react';
import run from '../config/gemini';
export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [resultData, setResultData] = useState("");   

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResults(true)
        setRecentPrompt(input);
        const response = await run(input);
        setResultData(response);
        setLoading(false);
        setInput("")
    };

    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResults,
        loading,
        resultData, 
        input,
        setInput,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;