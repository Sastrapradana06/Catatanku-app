
import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Navbar} from './Components/Navbar'
import Semua from './Components/Semua'
import Folder from './Components/Folder'
import TulisMemo from './Components/TulisMemo'

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="relative top-[130px]">
        <Routes>
          <Route path='/' element={<Semua />}/>
          <Route path='/folder' element={<Folder />}/>
          <Route path='/tulismemo'  element={<TulisMemo />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
