import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

export const Main = () => {
  return (
    <>
        <div className="main">
            <div className="nav">
                <p>ConvoAI</p>
                <img src={assets.user_icon} alt="user" />
            </div>
            <div className="main-container">
              <div className="greet">
                <p><span>Hello, Linuka</span></p>
                <p>How can I help you today?</p>
              </div>
              <div className="cards">
                <div className="card">
                    <p>Suggest beatuful places to visit</p>
                    <img src={assets.compass_icon} alt="compas" />
                </div>
                <div className="card">
                    <p>Give me an idea for plan the day</p>
                    <img src={assets.bulb_icon} alt="compas" />
                </div>
                <div className="card">
                    <p>Write a simple story</p>
                    <img src={assets.message_icon} alt="compas" />
                </div>
                <div className="card">
                    <p>Write a code for simple game</p>
                    <img src={assets.code_icon} alt="compas" />
                </div>
              </div>

              <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder="Enter promt here.." />
                    <div>
                      <img src={assets.gallery_icon} alt="gallery" />
                      <img src={assets.mic_icon} alt="mic" />
                      <img src={assets.send_icon} alt="search" /> 
                    </div>
                </div>  
                <p className="bottom-info">
                  ConvoAI may display inaccurate info, including about people, so double-check its responses. Your privacy & ConvoAI Apps
                </p>
              </div> 
            </div>
        </div>
    </>
  )
}

export default Main;