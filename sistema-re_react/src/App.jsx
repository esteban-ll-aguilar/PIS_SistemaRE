import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import {Iniciosesion} from './pages/login/iniciosesion'; // Aquí corregimos la importación
import { Graficas } from './pages/graphics/graficas';
import { Informe } from './pages/interfaces/informe/informe';
import { Interfaz } from './pages/interfaces/interfaz';
import { Home } from './pages/home';
// examples no topar, agregrar sus rutas arriba de esta linea
import ListaEstudiantes  from './pages/examples/lista_estudiantes';


function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home  />} />
    <Route path='/iniciosesion' element={<Iniciosesion  />} />
    <Route path='/graficas' element={<Graficas  />} />
    <Route path='/informe' element={<Informe  />} />
    <Route path='/interfaz' element={<Interfaz  />} />
    <Route path='/lista_estudiantes' element={<ListaEstudiantes  />} />
    

   </Routes>
   </BrowserRouter>
  )
}

export default App;