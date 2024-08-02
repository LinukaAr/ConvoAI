import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "",
    authDomain: "convoai-ad808.firebaseapp.com",
    projectId: "convoai-ad808",
    storageBucket: "convoai-ad808.appspot.com",
    messagingSenderId: "889422903444",
    appId: "1:889422903444:web:8aea324f5009a544dc9c81",
    measurementId: "G-JT3LG3ZT54"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { db };
export { auth };




