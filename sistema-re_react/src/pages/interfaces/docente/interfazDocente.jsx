import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Materias from '../../../components/materias';
import Informe from '../informe/informe';
import Graficas from '../../graphics/graficas';
import { Outlet, useParams } from 'react-router-dom';
import { HiOutlineDocumentDuplicate, HiViewBoards } from "react-icons/hi";
import { FaTachometerAlt } from "react-icons/fa";
import EstudianteCursa from '../../examples/estudianteCursa';

const InterfazDocente = () => {
    const { id } = useParams();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [selectComponent, setSelectComponent] = useState('Principal');
    const [selectedMateriaId, setSelectedMateriaId] = useState(null);
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

    useEffect(() => {
        if (selectComponent === '/materias') {
            setSelectedMateriaId(null);
        }
    }, [selectComponent]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const principal = [
        {
            icono: <FaTachometerAlt color='white' />,
            texto: 'Principal',
            ruta: 'Principal'
        },
    ];

    const administrar = [
        {
            icono: <HiViewBoards color='white' />,
            texto: 'Materias',
            ruta: '/materias'
        }
    ];

    const acciones = [
        {
            icono: <HiOutlineDocumentDuplicate color='white' />,
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
      <div className='dark:bg-slate-700 '>
      <section className='flex '>
        <Sidebar
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
          role='Panel Docente'
          principal={principal}
          administrar={administrar}
          acciones={acciones}
          setSelectedComponent={setSelectComponent} // [2]
        />
        <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'}  dark:bg-slate-700`}>
          <Dashboardview role={data.user_nombres} toggleSidebar={toggleSidebar} />
          <Outlet />
          
        {selectComponent === 'Principal' && (
            <Materias baseUrl="http://127.0.0.1:5000/docente" endpoint="materias" parameter={id} title={"Sus materias"}/>
            
        )}
        {selectComponent === '/materias' && (
          <div className='App py-80 flex flex-col items-center justify-center dark:max-h-full dark:bg-slate-700'>
            <h1 className='text-3xl font-bold dark:text-white'>Bienvenido, {data.user_nombres} {data.user_apellidos}</h1>
          <p className='text-gray-500 dark:text-white '>Selecciona una opción del menú</p>
        </div>
        )}
        
        {selectComponent === '/informe' && (
            <Informe />
        )}
        {selectComponent === '/graficas' && (
            <Graficas />
        )}
        </section>

                    {selectComponent === 'Principal' && (
                        <div className='App py-80 flex flex-col items-center justify-center dark:max-h-full dark:bg-slate-700'>
                            <h1 className='text-3xl font-bold dark:text-white'>Bienvenido, {data.user_nombres} {data.user_apellidos}</h1>
                            <p className='text-gray-500 dark:text-white'>Selecciona una opción del menú</p>
                        </div>
                    )}
                    {selectComponent === '/materias' && (
                        selectedMateriaId ? (
                            <EstudianteCursa id={selectedMateriaId} />
                        ) : (
                            <Materias
                                baseUrl="http://127.0.0.1:5000/docente"
                                endpoint="materias"
                                parameter={id}
                                title={"Materias"}
                                onSelectMateria={(materiaId) => setSelectedMateriaId(materiaId)}
                            />
                        )
                    )}
                    {selectComponent === '/informe' && (
                        <Informe />
                    )}
                    {selectComponent === '/graficas' && (
                        <Graficas />
                    )}
                </section>
            </section>
        </div>
    );
};

export default InterfazDocente;
