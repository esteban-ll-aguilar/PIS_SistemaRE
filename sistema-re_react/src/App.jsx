// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Iniciosesion from './pages/login/iniciosesion';
import Graficas from './pages/graphics/graficas';
import { Informe } from './pages/interfaces/informe/informeSeguimiento';
import InterfazAdmin from './pages/interfaces/admin/interfazAdmin';
import InterfazDocente from './pages/interfaces/docente/interfazDocente';
import InterfazResponsable from './pages/interfaces/responsable/interfazResponsable';
import Home from './pages/home';
import Calificaciones from './pages/interfaces/docente/calificaciones';
import ActivacionCuentaUser from './pages/login/activacion';
import Materias from './pages/examples/materiasCiclos';
import EstudianteCursa from './components/estudianteCursa';
import DocenteMaterias from './components/materias';
import FormUnidad from './pages/interfaces/docente/formUnidad';
import OLvidoContrasena from './pages/login/ovido_contrasena';
import Pepito from './pages/examples/pepito';
import { GrayscaleProvider, useGrayscale } from './components/GrayscaleContext';

const GrayscaleToggle = () => {
  const { isGrayscale, toggleGrayscale } = useGrayscale();
};

const AppContent = () => {
  const { isGrayscale } = useGrayscale();

  return (
    <div className={isGrayscale ? 'grayscale' : ''}>
      <Router>
        <GrayscaleToggle />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/iniciosesion' element={<Iniciosesion />} />
          <Route path='/iniciosesion/olvido-contrasena' element={<OLvidoContrasena />} />
          <Route path='/example' element={<Pepito />} />
          <Route path='/graficas' element={<Graficas />} />
          <Route path='/informe' element={<Informe />} />
          <Route path='/interfaz/admin/:id' element={<InterfazAdmin />} />
          <Route path='/interfaz/docente/:id' element={<InterfazDocente />} />
          <Route path='/interfaz/responsable/:id' element={<InterfazResponsable />} />
          <Route path='/ciclos/materias/:id' element={<Materias />} />
          <Route path='/estudiantes/materia/:id' element={<EstudianteCursa />} />
          <Route path='/admin/ciclos/materias/:id' element={<Materias />} />
          <Route path='/admin/estudiantes/materia/:id' element={<EstudianteCursa viewBottonForm={false} ShowDelete={false} />} />
          <Route path='/docente/materias/:id' element={<DocenteMaterias />} />
          <Route path='/materia/crear/unidad/:id/:idDocente' element={<FormUnidad />} />
          <Route path='/estudiantes/calificaciones/materia/:idMateria/unidad/:idUnidad' element={<Calificaciones />} />
          <Route path='/activar-cuenta/:id' element={<ActivacionCuentaUser />} />
        </Routes>
      </Router>
    </div>
  );
};

function App() {
  return (
    <GrayscaleProvider>
      <AppContent />
    </GrayscaleProvider>
  );
}

export default App;
