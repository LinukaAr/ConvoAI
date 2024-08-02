import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import  Main  from './components/Main/Main'
import { auth } from './firebaseConfig';


const App = () => {
  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  )
}
// const apiKey = "AIzaSyDFlcgYUn-K5v4xiD9ff8rfgx8m5t6GHQY"; // Insert your API key here


export default App