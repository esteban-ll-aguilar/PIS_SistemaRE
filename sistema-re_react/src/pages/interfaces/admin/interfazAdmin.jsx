import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { HiOutlineDocumentDuplicate, HiViewBoards, HiUserGroup, HiOutlineRefresh } from 'react-icons/hi';
import { FaBook, FaTachometerAlt, FaTeeth, FaUser, FaUserGraduate } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Informe from '../informe/informeSeguimiento';
import Graficas from '../../graphics/graficas';
import Ciclos from './ciclos';
import FormEstudianteDocente from './formEstudianteDocente';
import EstudientTarget from '../../../components/EstudientTarget';
import Materias from '../../../components/materias';
import EstudianteCursa from '../../../components/estudianteCursa';
import FuncionDocente from './funcionDocente';
import PaginaInfoAdmin from './paginaInfoAdmin';
import TarjetaGraficasAdmin from '../../../components/TarjetaGraficasAdmin';
import verificarFuncion from '../../../components/funtions/verificarFuncion';
import RolPersonalEducativo from '../../../components/RolPersonalEducativo';
import AdministrarDocentes from './administrar/administrarDocentes';
import AdministrarMaterias from './administrar/administrarMaterias';

const InterfazAdmin = () => {
  const { id } = useParams();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectComponent, setSelectComponent] = useState('Principal');
  const [selectedCicloId, setSelectedCicloId] = useState(null);
  const [selectedMateriaId, setSelectedMateriaId] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/usuario/${id}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setData(data.usuario[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  verificarFuncion(id, 'ADMINISTRADOR');
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (selectComponent === 'Principal') {
      setSelectedCicloId(null);
      setSelectedMateriaId(null);
    }
  }, [selectComponent]);

  const principal = [
    {
      icono: <FaTachometerAlt color='white' />,
      texto: 'Principal',
      ruta: 'Principal'
    },
    {
      icono: <HiUserGroup color='white' />,
      texto: 'Pagina Informativa',
      ruta: '/paginaInfoAdmin'
    }
  ];


  const administrar = [
    {
      icono: <HiUserGroup color='white' />,
      texto: 'Funciones Docentes',
      ruta: '/funcionDocente'
    },
    {
      icono: <FaTeeth color='white' />,
      texto: 'Docentes',
      ruta: '/docentes'
    },
    {
      icono: <FaBook color='white' />,
      texto: 'Materias',
      ruta: '/materias'
    },
    {
      icono: <FaUser color='white' />,
      texto: 'Sus Roles',
      ruta: '/roles'
    }
  ];

  const acciones = [
    {
      icono: <HiOutlineRefresh color='white' />,
      texto: 'Crear Nuevo Periodo',
      ruta: '/actualizarDatos'
    },
    {
      icono: <FaUserGraduate color='white' />,
      texto: 'Descargar Informe',
      ruta: '/informe'
    },
    {
      icono: <HiOutlineDocumentDuplicate color='white' />,
      texto: 'Graficas',
      ruta: '/graficas'
    }
  ];

  return (
    <div className='dark:bg-slate-700 h-[100%]'>
      <section className='flex '>
        <Sidebar
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          panel='Panel_'
          role='Administrador'
          principal={principal}
          administrar={administrar}
          acciones={acciones}
          setSelectedComponent={setSelectComponent} // [2]
        />
        <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'} `}>
          <Dashboardview role={data.user_nombres} toggleSidebar={toggleSidebar} />
          <Outlet />
          <p className="mt-8"></p>

          {selectComponent === 'Principal' && (
            selectedCicloId ? (
              selectedMateriaId ? (
                <EstudianteCursa id={selectedMateriaId} ShowDelete={false} viewBottonForm={false} />
              ) : (
                <Materias
                  baseUrl="http://127.0.0.1:5000/ciclos"
                  endpoint="materias"
                  parameter={selectedCicloId}
                  title={"Materias"}
                  materiasAdmin={true}
                  onSelectMateria={(materiaId) => setSelectedMateriaId(materiaId)}
                />
              )
            ) : (
              <Ciclos onSelectCiclo={(cicloId) => setSelectedCicloId(cicloId)} />
            )
          )}

          {selectComponent === '/paginaInfoAdmin' && (
            
            <PaginaInfoAdmin />
          )}
          {selectComponent === '/funcionDocente' && (
            <FuncionDocente />
          )}
          {selectComponent === '/roles' && (
            <RolPersonalEducativo cedula={id} />
          )}
          {selectComponent === '/docentes' && (
            <AdministrarDocentes />
          )}
          {selectComponent === '/materias' && (
            <AdministrarMaterias />
          )}
          {selectComponent === '/actualizarDatos' && (
            <FormEstudianteDocente id={id} />
          )}
          {selectComponent === '/informe' && (
            <Informe />
          )}
          {selectComponent === '/graficas' && (
            <TarjetaGraficasAdmin />
          )}
          {selectComponent === '/estudiantes' && (
            <EstudientTarget />
          )}
        </section>
      </section>
    </div>
  );
};

export default InterfazAdmin;
