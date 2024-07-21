import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HiOutlineDocumentDuplicate, HiUserGroup, HiOutlineRefresh, HiBookmark, HiBookOpen, HiBookmarkAlt, HiOutlineClipboardCopy, HiHome, HiAnnotation } from 'react-icons/hi';
import { FaBook, FaTachometerAlt, FaTeeth, FaUser, FaUserGraduate, FaUserFriends, FaImages, FaFileDownload } from 'react-icons/fa';
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
import AdministrarEstudiantes from './administrar/administrarEstudiantes';

const InterfazAdmin = () => {
  const { id } = useParams();
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectComponent, setSelectComponent] = useState('Principal');
  const [selectedCicloId, setSelectedCicloId] = useState(null);
  const [selectedMateriaId, setSelectedMateriaId] = useState(null);
  const [data, setData] = useState({});
  verificarFuncion(id, 'ADMINISTRADOR');

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
      icono: <HiHome color='white' className='size-5' />,
      texto: 'Principal',
      ruta: 'Principal'
    },
    {
      icono: <HiAnnotation color='white' className='size-5' />,
      texto: 'Pagina Informativa',
      ruta: 'PaginaInformativa'
    },
    {
      icono: <FaUser color='white' className='size-5' />,
      texto: 'Sus Roles',
      ruta: 'Roles'
    }
  ];

  const administrar = [
    {
      icono: <FaUserFriends color='white' className='size-5' />,
      texto: 'Funciones Docentes',
      ruta: 'FuncionDocente'
    },
    {
      icono: <FaBook color='white' className='size-5' />,
      texto: 'Materias',
      ruta: 'Materias'
    },
    {
      icono: <FaTeeth color='white' className='size-5' />,
      texto: 'Docentes',
      ruta: 'Docentes'
    },
    {
      icono: <FaUserGraduate color='white' className='size-5' />,
      texto: 'Estudiantes',
      ruta: 'Estudiantes'
    },
    
  ];

  const acciones = [
    {
      icono: <HiOutlineRefresh color='white' className='size-5' />,
      texto: 'Crear Nuevo Periodo',
      ruta: 'ActualizarDatos'
    },
    {
      icono: <FaFileDownload color='white' className='size-5'/>,
      texto: 'Descargar Informe',
      ruta: 'Informe'
    },
    {
      icono: <FaImages color='white' className='size-5' />,
      texto: 'Graficas',
      ruta: 'Graficas'
    }
  ];

  const renderSelectedComponent = () => {
    switch (selectComponent) {
      case 'Principal':
        return selectedCicloId ? (
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
        );
      case 'PaginaInformativa':
        return <PaginaInfoAdmin />;
      case 'FuncionDocente':
        return <FuncionDocente />;
      case 'Roles':
        return <RolPersonalEducativo cedula={id} />;
      case 'Docentes':
        return <AdministrarDocentes />;
      case 'Materias':
        return <AdministrarMaterias />;
      case 'ActualizarDatos':
        return <FormEstudianteDocente id={id} />;
      case 'Informe':
        return <Informe />;
      case 'Graficas':
        return <TarjetaGraficasAdmin />;
      case 'Estudiantes':
        return  <AdministrarEstudiantes /> //<EstudientTarget />;
      default:
        return null;
    }
  };

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
          setSelectedComponent={setSelectComponent}
        />
        <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'} `}>
          <Dashboardview role={id} toggleSidebar={toggleSidebar} />
          {renderSelectedComponent()}
        </section>
      </section>
    </div>
  );
};

export default InterfazAdmin;
