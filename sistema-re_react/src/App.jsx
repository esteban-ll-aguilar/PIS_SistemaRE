import React from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import {Iniciosesion} from './pages/login/iniciosesion'; // Aquí corregimos la importación
import { Graficas } from './pages/graphics/graficas';
import { Informe } from './pages/interfaces/informe/informe';
import { Interfaz } from './pages/interfaces/interfaz';
import { Home } from './pages/home';

// examples no topar, agregrar sus rutas arriba de esta linea
import ListaCiclos  from './pages/examples/ciclos';
import Materias from './pages/examples/materiasCiclos';

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home  />} />
    <Route path='/iniciosesion' element={<Iniciosesion  />} />
    <Route path='/graficas' element={<Graficas  />} />
    <Route path='/informe' element={<Informe  />} />
    <Route path='/interfaz' element={<Interfaz  />} />
    <Route path='/ciclos' element={<ListaCiclos  />} />  
    <Route path='/ciclos/materias/:id' element={<Materias  />} />


    

   </Routes>
   </BrowserRouter>
  )
}

export default App;