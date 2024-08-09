import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import Materias from '../../../components/materias';
import Informe from '../informe/informeSeguimiento';
import Graficas from '../../graphics/graficas';
import { useParams } from 'react-router-dom';
import { HiAnnotation, HiHome, HiOutlineDocumentDuplicate, HiViewBoards } from "react-icons/hi";
import { FaFile, FaImages, FaPage4, FaPagelines, FaPager, FaTachometerAlt, FaUser, FaUserCircle, FaUserEdit, FaUserInjured, FaUsersCog, FaUserSecret, FaUserTimes } from "react-icons/fa";
import EstudianteCursa from '../../../components/estudianteCursa';
import PaginaInfoAdmin from './paginaInfoAdmin';
import RolPersonalEducativo from '../../../components/RolPersonalEducativo';
import verificarFuncion from '../../../components/funtions/verificarFuncion';
import CalificacionesBajasEstudiantes from './calificacionesBajasEstudiantes';
import GraficasUnidad from '../../graphics/graficasUnidad';
import { useSnackbar } from 'notistack';
import {verificarFechaMayorAUnMes} from '../../../components/funtions/verificarFecha';
const InterfazDocente = () => {
    const { id } = useParams();
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [selectComponent, setSelectComponent] = useState('Principal');
    const [selectedMateriaId, setSelectedMateriaId] = useState(null);
    const [data, setData] = useState([]);
    const [periodoAcademico, setPeriodoAcademico] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [showDelete, setShowDelete] = useState(true);

    verificarFuncion(id, 'DOCENTE');

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
        const fetchPeriodoAcademico = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/obtener/periodo_academico`, {
                    method: 'GET',
                });
        
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
        
                const responseData = await response.json();
                if (responseData && responseData.periodo_academico && responseData.periodo_academico.length > 0) {
                    const periodo = responseData.periodo_academico[0];
                    setPeriodoAcademico(periodo);
                    console.log(periodo.fecha_inicio);
                    setShowDelete(verificarFechaMayorAUnMes(periodo.fecha_inicio));
                } else {
                    throw new Error('Response data is not in expected format');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                enqueueSnackbar('Error al cargar el periodo académico', { variant: 'error' });
            }
        };
      
        fetchPeriodoAcademico();
        fetchData();
    }, [id]);

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
        },
        {
            icono: <FaFile color='white' className='size-5' />,
            texto: 'Formato Notas',
            ruta: '/formatoNotas'
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
                            <EstudianteCursa id={selectedMateriaId} idDocente={id} ShowDelete={showDelete} />
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
                    {selectComponent === '/graficas' && <GraficasUnidad cedula={id} />}
                    {selectComponent === '/estudiantesBajos' && <CalificacionesBajasEstudiantes cedula={id}/>}
                    {selectComponent === '/formatoNotas' && 
                    <>
                        <h1 className='text-2xl font-bold text-center dark:text-white'>Formato de Notas</h1>
                        <div className='flex justify-center'>
                            <iframe src="https://docs.google.com/spreadsheets/d/1gHq4lKDtaeOe3VmhYdwH77ss0Xaz_Urh/edit?usp=drive_link&ouid=105616310271479743819&rtpof=true&sd=true" width="840" height="580"></iframe>
                        </div>
                        
                    </>}
                </section>
            </section>
        </div>
    );
};

export default InterfazDocente;
