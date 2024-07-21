import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Materias from '../../../components/materias';
import Informe from '../informe/informeSeguimiento';
import Graficas from '../../graphics/graficas';
import { useParams } from 'react-router-dom';
import { HiAnnotation, HiHome, HiOutlineDocumentDuplicate, HiViewBoards } from "react-icons/hi";
import { FaImages, FaPage4, FaPagelines, FaPager, FaTachometerAlt, FaUser, FaUserCircle, FaUserEdit, FaUserInjured, FaUsersCog, FaUserSecret, FaUserTimes } from "react-icons/fa";
import EstudianteCursa from '../../../components/estudianteCursa';
import PaginaInfoAdmin from './paginaInfoAdmin';
import RolPersonalEducativo from '../../../components/RolPersonalEducativo';
import verificarFuncion from '../../../components/funtions/verificarFuncion';
import CalificacionesBajasEstudiantes from './calificacionesBajasEstudiantes';
import GraficasUnidad from '../../graphics/graficasUnidad';

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

    verificarFuncion(id, 'DOCENTE');

    useEffect(() => {
        if (selectComponent === 'Principal') {
            setSelectedMateriaId(null);
        }
    }, [selectComponent]);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const principal = [
        {
            icono: <HiHome color='white' className='size-5' />,
            texto: 'Principal',
            ruta: 'Principal'
        },
        {
            icono: <HiAnnotation color='white' className='size-5' />,
            texto: 'Pagina Informativa',
            ruta: '/paginaInformativa'
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
            icono: <FaUserTimes color='white' className='size-5' />,
            texto: 'Ver Estudiantes Bajos',
            ruta: '/estudiantesBajos'
        },
        {
            icono: <FaImages color='white' className='size-5' />,
            texto: 'Graficas',
            ruta: '/graficas'
        }
    ];

    return (
        <div className='dark:bg-slate-700'>
            <section className='flex'>
                <Sidebar
                    isVisible={isSidebarVisible}
                    toggleSidebar={toggleSidebar}
                    role='Panel Docente'
                    principal={principal}
                    administrar={administrar}
                    acciones={acciones}
                    setSelectedComponent={setSelectComponent}
                    className='z-50'
                />
                <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'} dark:bg-slate-700`}>
                    <Dashboardview role={id} toggleSidebar={toggleSidebar} />
                    
                    {selectComponent === 'Principal' && (
                        selectedMateriaId ? (
                            <EstudianteCursa id={selectedMateriaId} idDocente={id} />
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
                    {selectComponent === '/paginaInformativa' && <PaginaInfoAdmin />}
                    {selectComponent === '/roles' && <RolPersonalEducativo cedula={id} />}
                    {selectComponent === '/graficas' && <GraficasUnidad />}
                    {selectComponent === '/estudiantesBajos' && <CalificacionesBajasEstudiantes cedula={id}/>}
                </section>
            </section>
        </div>
    );
};

export default InterfazDocente;
