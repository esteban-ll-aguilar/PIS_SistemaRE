import {React} from 'react'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css'
import Iniciosesion from './pages/login/iniciosesion'; // Aquí corregimos la importación
import  Graficas  from './pages/graphics/graficas';
import { Informe } from './pages/interfaces/informe/informe';
import InterfazAdmin  from './pages/interfaces/admin/interfazAdmin';
import InterfazDocente  from './pages/interfaces/docente/interfazDocente';
import InterfazResponsable  from './pages/interfaces/responsable/interfazResponsable';
import Home  from './pages/home';
import Calificaciones from './pages/interfaces/docente/calificaciones';

import Materias from './pages/examples/materiasCiclos';
import EstudianteCursa from './pages/examples/estudianteCursa';
import DocenteMaterias from './components/materias';
import FormUnidad from './pages/interfaces/docente/formUnidad';
import Pepito from './pages/examples/pepito';
function App() {

  
   



  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home  />} />
    <Route path= '/example' element={<Pepito />} />
    <Route path='/iniciosesion' element={<Iniciosesion  />} />
    <Route path='/graficas' element={<Graficas  />} />
    <Route path='/informe' element={<Informe  />} />
    <Route path='/interfaz/admin/:id' element={<InterfazAdmin  />} />
    <Route path='/interfaz/docente/:id' element={<InterfazDocente  />} />
    <Route path='/interfaz/responsable/:id' element={<InterfazResponsable  />} />
    <Route path='/ciclos/materias/:id' element={<Materias  />} />
    <Route path='/estudiantes/materia/:id' element={<EstudianteCursa  />} />
    <Route path='/admin/ciclos/materias/:id' element={<Materias  />} />
    <Route path='/admin/estudiantes/materia/:id' element={<EstudianteCursa viewBottonForm={false} ShowDelete={false} />} />
    <Route path='/docente/materias/:id' element={<DocenteMaterias  />} />
    <Route path='/materia/crear/unidad/:id' element={<FormUnidad />} />
    <Route path='/estudiantes/calificaciones/materia/:idMateria/unidad/:idUnidad' element={<Calificaciones  />} />
    

   </Routes>
   </BrowserRouter>
  )
}

export default App;