import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//components
import Applayout from './components/applayout/Applayout'
import { setTheme } from './features/themeslice'

//notes
import NoteCard from './components/notes/NoteCard'


function App() {
  


  return (
    <div className=''>
      <Applayout />
       
    </div>
  )
}

export default App
