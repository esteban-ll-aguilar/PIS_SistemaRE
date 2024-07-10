import React, { useState, useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { HiOutlineDocumentDuplicate, HiViewBoards, HiUserGroup, HiOutlineRefresh } from 'react-icons/hi';
import { FaTachometerAlt, FaUserGraduate } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Informe from '../informe/informeSeguimiento';
import Ciclos from '../admin/ciclos';
import FormEstudianteDocente from '../admin/formEstudianteDocente';
import EstudientTarget from '../../../components/EstudientTarget';
import Materias from '../../../components/materias';
import EstudianteCursa from '../../../components/estudianteCursa';
import TarjetaGraficasAdmin from '../../../components/TarjetaGraficasAdmin';
const InterfazResponsable = () => {
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
    }
  ];
  
  const administrar = [
    
  ];
  
  const acciones = [
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
          role='Responsable'
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
          
          {selectComponent === '/periodoAcademico' && (
            <div className='App py-80 flex flex-col items-center justify-center dark:max-h-full dark:bg-slate-700'>
              <h1 className='text-3xl font-bold dark:text-white'>Periodo Academico</h1>
              <p className='text-gray-500 dark:text-white '>Selecciona una opción del menú</p>
            </div>
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

export default InterfazResponsable;
