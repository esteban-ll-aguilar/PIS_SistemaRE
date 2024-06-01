import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Iniciosesion } from './pages/login/iniciosesion';
import { Graficas } from './pages/graphics/graficas';
import { Informe } from './pages/interfaces/informe/informe';
import { Interfaz } from './pages/interfaces/interfaz';
import { Home } from './pages/home';
import './App.css'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home  />} />
    <Route path='/iniciosesion' element={<Iniciosesion  />} />
    <Route path='/graficas' element={<Graficas  />} />
    <Route path='/informe' element={<Informe  />} />
    <Route path='/interfaz' element={<Interfaz  />} />
   </Routes>
   </BrowserRouter>
  )
}

export default App;