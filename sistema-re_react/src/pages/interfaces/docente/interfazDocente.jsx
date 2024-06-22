import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Materias from '../materias';
import Informe from '../informe/informe';
import { Outlet, useParams } from 'react-router-dom';
import { HiAcademicCap, HiOutlineDocumentDuplicate, HiViewBoards } from "react-icons/hi"
import { FaTachometerAlt } from "react-icons/fa"
import html2canvas from 'html2canvas';

const InterfazDocente = () => {
    const { id } = useParams();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [selectComponent, setSelectComponent] = useState('Principal');
    const [data, setData] = useState([]);

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
    const principal = [
        {
            icono: <FaTachometerAlt color='white' />,
            texto: 'Principal',
            ruta: 'Principal'
        },
        
      // Añadir elementos de la misma forma que en 'administrar'
    ];
    const administrar = [
        
        {
            icono: <HiViewBoards color='white' />,
            texto: 'Materias',
            ruta: '/materias'
        },
      // Añadir elementos de la misma forma que en 'acciones'
    ];
    const acciones = [
        {
            icono: <HiOutlineDocumentDuplicate color='white' />,
            texto: 'Informe',
            ruta: '/informe'
        }
      // Agregar más elementos según sea necesario
    ];
  
  
    return (
      <section className='flex'>
        <Sidebar
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          role='Docente'
          principal={principal}
          administrar={administrar}
          acciones={acciones}
          setSelectedComponent={setSelectComponent} // [2]
        />
        <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'}`}>
          <Dashboardview role={data.user_nombres} toggleSidebar={toggleSidebar} />
          <Outlet />
          <p className="mt-8"></p>
          
        {selectComponent === 'Principal' && (
          <div className='flex flex-col items-center justify-center h-full'>
            <h1 className='text-3xl font-bold'>Bienvenido, {data.user_nombres} {data.user_apellidos}</h1>
            <p className='text-gray-500'>Selecciona una opción del menú</p>
            </div>
        )}
        {selectComponent === '/materias' && (
            <Materias baseUrl="http://127.0.0.1:5000/docente" endpoint="materias" docente={id}/>
        )}
        {selectComponent === '/informe' && (
            <Informe />
        )}
        </section>

      </section>
    );
  };

export default InterfazDocente
  