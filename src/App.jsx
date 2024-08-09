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


export default App
