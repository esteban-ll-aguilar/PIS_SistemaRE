import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineDocumentDuplicate, HiViewBoards, HiUserGroup, HiAnnotation, HiOutlineClipboardCopy, HiPhotograph } from 'react-icons/hi';
import { FaFileDownload, FaFileImport, FaHome, FaImages, FaProjectDiagram, FaTachometerAlt, FaUser, FaUserGraduate } from 'react-icons/fa';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Informe from '../informe/informeSeguimiento';
import Ciclos from '../admin/ciclos';
import EstudianteCursa from '../../../components/estudianteCursa';
import Materias from '../../../components/materias';
import TarjetaGraficasAdmin from '../../../components/TarjetaGraficasAdmin';
import RolPersonalEducativo from '../../../components/RolPersonalEducativo';
import PaginaInfoAdmin from './paginaInfoAdmin';
import Graficas from '../../graphics/graficas';
import verificarFuncion from '../../../components/funtions/verificarFuncion';
import GraficasResponsable from '../../graphics/graficasResponsable';

const InterfazResponsable = () => {
  const { id } = useParams();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectComponent, setSelectComponent] = useState('Principal');
  const [selectedCicloId, setSelectedCicloId] = useState(null);
  const [selectedMateriaId, setSelectedMateriaId] = useState(null);
  const [data, setData] = useState({});
  verificarFuncion(id, 'PERSONAL_SEGUIMIENTO');
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
      icono: <FaHome color='white' className='size-5' />,
      texto: 'Principal',
      ruta: 'Principal'
    },
    {
      icono: <HiAnnotation color='white' className='size-5' />,
      texto: 'Pagina Informativa',
      ruta: '/pagina_informativa'
    },
    {
      icono: <FaUser color='white' className='size-5' />,
      texto: 'Sus Roles',
      ruta: '/roles'
    }
  ];
  
  const administrar = [
    
  ];
  
  const acciones = [
    {
      icono: <FaFileDownload color='white' className='size-5' />,
      texto: 'Descargar Informe',
      ruta: '/informe'
    },
    {
      icono: <FaImages color='white' className='size-5' />,
      texto: 'Graficas',
      ruta: '/graficas'
    }
  ];

  return (
    <div className='dark:bg-slate-700 h-[100%] relative'>
      <section className='flex'>
        <Sidebar
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          role='Panel Responsable'
          principal={principal}
          administrar={administrar}
          acciones={acciones}
          setSelectedComponent={setSelectComponent}
          className="z-50 dark:bg-blue-950"
        />
        <section className={`flex flex-col w-full transition-all duration-300 relative ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'}`}>
          <Dashboardview role={id} toggleSidebar={toggleSidebar} className="z-50" />
          
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
          
          {selectComponent === '/pagina_informativa' && (
            <PaginaInfoAdmin/>
          )}
          {selectComponent === '/roles' && (
            <RolPersonalEducativo cedula={id} />
          )}
          {selectComponent === '/informe' && (
            <Informe />
          )}
          {selectComponent === '/graficas' && (
            <GraficasResponsable />
          )}
        </section>
      </section>
    </div>
  );
};

export default InterfazResponsable;
