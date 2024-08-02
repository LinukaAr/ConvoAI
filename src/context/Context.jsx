import React, { useState, createContext, useEffect } from 'react';
import run from '../config/gemini';
import { db, auth } from '../firebaseConfig'; // Import Firebase dependencies
import { collection, addDoc, getDocs, query, where, collectionGroup } from 'firebase/firestore'; // Import Firestore functions
import { getAuth, signInWithRedirect, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication
import 'firebase/firestore';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithPopup } from 'firebase/auth'; 

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [loading, setLoading] = useState(false);  
    const [resultData, setResultData] = useState(""); 
    const [user, setUser] = useState(null); // Declare user state

    const googleProvider = new GoogleAuthProvider();
    const authInstance = getAuth();

    const delayPara = (index, nextWord) => {
        setTimeout(function() {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const newChat = () => {
        setLoading(false);
        setShowResults(false);
    };

    // Function to save chat history to Firestore
    const saveHistoryToFirestore = async (userId, prompts) => {
        try {
            const userDocRef = doc(db, 'users', userId); // Get the user document
            const historyCollectionRef = collection(userDocRef, 'history'); // Get the history subcollection
            await addDoc(historyCollectionRef, {
                prompts,
                timestamp: serverTimestamp()
            });
            console.log("Prompt saved to Firestore: ", prompts);
        } catch (error) {
            console.error("Error saving history to Firestore: ", error);
        }
    };

    // Fetch chat history from Firestore
    const fetchHistory = async (user) => {
        if (user) {
            try {
                const userDocRef = doc(db, 'users', user.uid); // Get the user document
                const historyCollectionRef = collection(userDocRef, 'history'); // Get the history subcollection
                const querySnapshot = await getDocs(historyCollectionRef);
                const historyData = querySnapshot.docs.map(doc => doc.data().prompts); // Get the prompts from each document
                console.log("History data: ", historyData);
                setPrevPrompts(historyData);
            } catch (error) {
                console.error("Error fetching history: ", error);
            }
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authInstance, (user) => {
            setUser(user);
            fetchHistory(user); // Fetch history when the user's state changes
        });

        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(authInstance, googleProvider);
            const user = result.user;
            setUser(user); // Update user state
        } catch (error) {
            console.error(error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(authInstance);
            setUser(null); // Update user state
            window.location.reload(); // Reload the page after signing out
        } catch (error) {
            console.error(error);
        }
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResults(true);
        let response;

        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt);
        } else {
            // Save the prompt to Firestore only if the user is logged in
            if (user) {
                console.log("User is logged in: ", user);
                saveHistoryToFirestore(user.uid, input);
                console.log("Prompt saved to Firestore: " + input);
            }
            setPrevPrompts(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run(input);
        }

        // Process the response and update the resultData state
        let responseArray = response.split("**");
        let newResponse = ""; 

        for (let i = 0; i < responseArray.length; i++) {
            if (i % 2 === 0) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>"; 
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");
        let newResponseArray = newResponse2.split(" ");  
        for (let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord + " ");
        }

        setLoading(false);
        setInput("");
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
        newChat,
        setPrevPrompts,
        handleSignOut,
        handleGoogleSignIn
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
