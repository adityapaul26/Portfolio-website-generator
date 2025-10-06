import { useState } from 'react'
import './App.css'
import { Navbar1 } from './components/Navbar/Navbar1'
import { Navbar2 } from './components/Navbar/Navbar2'
import { Navbar3 } from './components/Navbar/Navbar3'
import Background1 from './components/Backgrounds/Background1'
import Background2 from './components/Backgrounds/Background2'

function App() {

  return (
    <>
      <Navbar1/>
      <Navbar2/>
      <Navbar3/>
      <Background1/>
      <Background2/>
    </>
  )
}

export default App
