import React, { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { db, auth } from '../../firebaseConfig'; // Correctly import db and auth

const Main = () => {
  const { onSent, recentPrompt, showResults, loading, resultData, input, setInput, prevPrompts, setPrevPrompts, handleGoogleSignIn, handleSignOut } = useContext(Context);
  const [user, setUser] = useState(null); // State for user authentication
  const [showLogoutMenu, setShowLogoutMenu] = useState(false); // State for logout menu

  

  // Update user state when authentication changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>ConvoAI</p>
          {user ? (
            <div onClick={() => setShowLogoutMenu(!showLogoutMenu)}>
              <img src={user.photoURL} alt="User Profile" className="user-icon" />
              {showLogoutMenu && (
                <div className="logout-menu">
                  <p onClick={handleSignOut}>Sign Out</p>
                </div>
              )}
            </div>
          ) : (
            <img onClick={handleGoogleSignIn} src={assets.user_icon} alt="user" />
          )}
        </div>

        <div className="main-container">
          {!showResults ? (
            <>
              <div className="greet">
                <p>
                  <span>
                    {user ? `Hello, ${user.displayName}` : 'Hello'}
                  </span>
                </p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                  <p>Suggest beautiful places to visit</p>
                  <img src={assets.compass_icon} alt="compass" />
                </div>
                <div className="card">
                  <p>Give me an idea for planning the day</p>
                  <img src={assets.bulb_icon} alt="bulb" />
                </div>
                <div className="card">
                  <p>Write a simple story</p>
                  <img src={assets.message_icon} alt="message" />
                </div>
                <div className="card">
                  <p>Write code for a simple game</p>
                  <img src={assets.code_icon} alt="code" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="result">
                <div className="result-title">
                  {user ? (
                    <img src={user.photoURL} alt="User Profile" className="user-icon" /> // Use user's photoURL
                  ) : (
                    <img src={assets.user_icon} alt="user" />
                  )}
                  <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="gemini" />
                  {loading ? (
                    <div className="loader">
                      <hr />
                      <hr />
                      <hr />
                    </div>
                  ) : (
                    <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="main-bottom">
            <div className="search-box">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Enter a prompt here.."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    onSent();
                  }
                }}
              />
              <div>
                {/* <img src={assets.gallery_icon} alt="gallery" />
                <img src={assets.mic_icon} alt="mic" /> */}
                <img onClick={() => onSent()} src={assets.send_icon} alt="send" />
              </div>
            </div>
            <p className="bottom-info">
              ConvoAI may display inaccurate info, including about people, so double-check its responses. Your privacy & ConvoAI Apps
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
