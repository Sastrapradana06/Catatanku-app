
import { Route, Routes } from 'react-router-dom'
import './App.css'
import {Navbar} from './Components/Navbar'
import Semua from './Components/Semua'
import BookMark from './Components/BookMark'
import TulisMemo from './Components/TulisMemo'
// import MemoDetail from './Components/memoDetail'
import SearchMemo from './Components/SearchMemo'

function App() {
  return (
    <div className="">
      <Navbar />
      <div className="relative top-[130px]">
        <Routes>
          <Route path='/' element={<Semua />}/>
          <Route path='/bookMark' element={<BookMark />}/>
          <Route path='/bookMark/memo-detail/:id'  element={<TulisMemo />} />
          <Route path='/tulismemo'  element={<TulisMemo />} />
          <Route path='memo-detail/:id'  element={<TulisMemo />} />
          <Route path='/search-memo'  element={<SearchMemo />} />
          <Route path='/search-memo/memo-detail/:id'  element={<TulisMemo />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
