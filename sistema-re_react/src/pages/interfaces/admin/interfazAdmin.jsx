import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { HiOutlineDocumentDuplicate, HiViewBoards, HiUserGroup, HiOutlineRefresh } from 'react-icons/hi';
import { FaBook, FaTachometerAlt, FaUserGraduate } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Informe from '../informe/informe';
import Graficas from '../../graphics/graficas';
import Ciclos from './ciclos';
import FormEstudianteDocente from './formEstudianteDocente';
import EstudientTarget from '../../../components/EstudientTarget';
import Materias from '../../../components/materias';

const InterfazAdmin = () => {
  const { id } = useParams();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectComponent, setSelectComponent] = useState('Principal');
  const [selectedCicloId, setSelectedCicloId] = useState(null);
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

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (selectComponent === '/ciclos') {
      setSelectedCicloId(null);
    }
  }, [selectComponent]);

  const principal = [
    {
      icono: <FaTachometerAlt color='white' />,
      texto: 'Principal',
      ruta: 'Principal'
    }
  ];
  
  const administrar = [
    {
      icono: <HiViewBoards color='white' />,
      texto: 'Ciclos',
      ruta: '/ciclos'
    },
    {
      icono: <FaBook color='white' />,
      texto: 'Periodo Academico',
      ruta: '/periodoAcademico'
    },
    {
      icono: <HiUserGroup color='white' />,
      texto: 'Funciones Docentes',
      ruta: '/funcionDocente'
    }
  ];
  
  const acciones = [
    {
      icono: <HiOutlineRefresh color='white' />,
      texto: 'Actualizar Datos',
      ruta: '/actualizarDatos'
    },
    {
      icono: <FaUserGraduate color='white' />,
      texto: 'Informe',
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
          panel='Panel'
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
            <div className='App py-80 flex flex-col items-center justify-center dark:max-h-full dark:bg-slate-700'>
              <h1 className='text-3xl font-bold dark:text-white'>Bienvenido, {data.user_primer_nombre} {data.user_primer_apellido}</h1>
              <p className='text-gray-500 dark:text-white '>Selecciona una opción del menú</p>
            </div>
          )}
          {selectComponent === '/ciclos' && (
            selectedCicloId ? (
              <Materias
                baseUrl="http://127.0.0.1:5000/ciclos"
                endpoint="materias"
                parameter={selectedCicloId}
                title={"Materias"}
                materiasAdmin={true}
                onSelectMateria={(materiaId) => setSelectedCicloId(materiaId)}
              />
            ) : (
              <Ciclos onSelectCiclo={(cicloId) => setSelectedCicloId(cicloId)} />
            )
          )}
          {selectComponent === '/periodoAcademico' && (
            <div className='App py-80 flex flex-col items-center justify-center dark:max-h-full dark:bg-slate-700'>
              <h1 className='text-3xl font-bold dark:text-white'>Periodo Academico</h1>
              <p className='text-gray-500 dark:text-white '>Selecciona una opción del menú</p>
            </div>
          )}
          {selectComponent === '/funcionDocente' && (
            <div className='App py-80 flex flex-col items-center justify-center dark:max-h-full dark:bg-slate-700'>
              <h1 className='text-3xl font-bold dark:text-white'>Funciones de docentes</h1>
              <p className='text-gray-500 dark:text-white '>Selecciona una opción del menú</p>
            </div>
          )}
          {selectComponent === '/actualizarDatos' && (
            <FormEstudianteDocente id={id}/>
          )}
          {selectComponent === '/informe' && (
            <Informe />
          )}
          {selectComponent === '/graficas' && (
            <Graficas />
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
