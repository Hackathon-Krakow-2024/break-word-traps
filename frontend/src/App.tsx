import { Route, BrowserRouter, Routes } from 'react-router-dom'
import { Header } from './components/Header/Header'
import { Home } from './pages/Home/Home'
import { Contact } from './pages/Contact/Contact'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
