import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

export const Main = () => {
  const { onSent, recentPrompt, showResults, loading, resultData, input, setInput } = useContext(Context);

  return (
    <>
      <div className="main">
        <div className="nav">
          <p>ConvoAI</p>
          <img src={assets.user_icon} alt="user" />
        </div>
        
        <div className="main-container">
          {!showResults ? (
            <>
              <div className="greet">
                <p><span>Hello, Linuka</span></p>
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
                  <img src={assets.user_icon} alt="user" />
                  <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                  <img src={assets.gemini_icon} alt="gemini" />
                  {loading
                  ?<div className="loader">
                    <hr/>
                    <hr/>
                    <hr/>
                  </div>
                  :<p dangerouslySetInnerHTML={{__html: resultData}}></p>
                  }
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
                placeholder="Enter prompt here.."
              />
              <div>
                <img src={assets.gallery_icon} alt="gallery" />
                <img src={assets.mic_icon} alt="mic" />
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
