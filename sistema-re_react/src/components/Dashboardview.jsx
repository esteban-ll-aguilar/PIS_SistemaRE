import {React, useEffect, useState} from 'react'
import { FaSearch, FaEnvelope, FaRegBell, FaBars, FaChevronRight } from "react-icons/fa"
import profile from "../assets/profile.png"
import { Link } from 'react-router-dom'
import SendEmail from './SendEmail';
import Profile from '../pages/examples/gestionPerfil';
import Sidebar from './Sidebar';
import { useGrayscale } from './GrayscaleContext';


const Dashboardview = ({ role, toggleSidebar, acciones, setSelectedComponent, principal }) => {
    const [usuario, setUsuario] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch(`http://127.0.0.1:5000/usuario/${role}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const usuario = await response.json();
        setUsuario(usuario.usuario[0]);
        } catch (error) {
        console.error('Error fetching data:', error);
        }
    };
    
    fetchData();
    }, []);

    
    
    
    const [open, setOpen] = useState(false)

    const showProfile = () => {
        setOpen(!open)
    }

    const handleClick = (ruta) => {
        setSelectedComponent(ruta);
    };

    

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const openProfileModal = () => {
        setIsProfileModalOpen(true);
      };
    
      const closeProfileModal = () => {
        setIsProfileModalOpen(false);
      };

      const [modoNoche, setModoNoche] = useState(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          return 'light';
        }
        return 'dark';
      })
    
      useEffect(() => {
        if (modoNoche === 'dark') {
          document.querySelector('html').classList.add('dark');
      } else {
        document.querySelector('html').classList.remove('dark');
      }
      } , [modoNoche]);
    
      const toggleModoNoche = () => {
        setModoNoche((modoNoche) => modoNoche === 'light' ? 'dark' : 'light');
      }
    const { isGrayscale, toggleGrayscale } = useGrayscale();


    return (
        <>
        <header className='flex items-center justify-between px-6 py-5 border-b border-gray-300 bg-[#04344c] shadow-sm dark:bg-blue-950'>
            <div className='flex items-center gap-4 '>

                <button onClick={toggleSidebar} className='p-3  text-white rounded-md bg-[#529914]  dark:bg-sky-700 hover:bg-[#3C6E10] transition-colors duration-300'>
                    <FaBars className='text-white size-7 hover:text-white ' />
                </button>

                {/* <div className='flex items-center bg-gray-100 rounded-md overflow-hidden '>
                    <input 
                        type="text" 
                        className='bg-gray-100 h-10 outline-none pl-4 w-72 text-sm ' 
                        placeholder='Buscar...' 
                    />
                    <button className='bg-[#529914] h-10 px-4 flex items-center justify-center text-white dark:bg-sky-700'>
                        <FaSearch />
                    </button>    
                </div> */}
            </div>

            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-5 border-r pr-6 text-[#529914]'>
                {/* <FaRegBell className='hover:text-white transition-colors duration-300 cursor-pointer' />  */}
                <FaEnvelope className='hover:text-white text-[#529914] transition-colors duration-300 cursor-pointer size-7' onClick={openModal} />
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                        <div className="w-96 bg-write p-2 rounded-lg shadow-md">
                            <SendEmail onClose={closeModal} userRemitente={usuario} />
                        </div>
                        </div>
                    )}
                </div>

                <div className='relative flex items-center gap-3 cursor-pointer text-white
                    dark:text-zinc-100 transition-colors duration-300
                    ' onClick={showProfile}
                    >
                    <p>{usuario.user_primer_nombre} {usuario.user_primer_apellido}</p>
                    <div className='h-12 w-12 rounded-full bg-transparent overflow-hidden'>
                        <img src={profile} alt="Profile" className='h-full w-full object-cover bg-neutral-200 dark:bg-neutral-300' />     
                    </div>
                    {open && (
                        <div className='bg-[#529914] border border-gray-300 shadow-lg absolute top-14 right-0 w-48 rounded-lg p-6 space-y-4 dark:bg-blue-900 transition-transform transform duration-300'>
                        <p 
                          className="cursor-pointer text-white font-semibold hover:text-yellow-300 dark:text-zinc-100 dark:hover:text-yellow-300 transition-colors"
                          onClick={openProfileModal}
                        >
                          Perfil
                        </p>
                        <p 
                          onClick={toggleModoNoche}
                          className='cursor-pointer text-white font-semibold hover:text-yellow-300 dark:text-zinc-100 dark:hover:text-yellow-300 transition-colors'
                        >
                          Modo Oscuro
                        </p>
                        <p 
                          onClick={toggleGrayscale}
                          className='cursor-pointer text-white font-semibold hover:text-yellow-300 dark:text-zinc-100 dark:hover:text-yellow-300 transition-colors'
                        >
                          {isGrayscale ? 'Desactivar' : 'Activar'} Escala de Grises
                        </p>
                        <p>
                          <Link 
                            to='/' 
                            className='cursor-pointer text-white font-semibold hover:text-yellow-300 dark:text-zinc-100 dark:hover:text-yellow-300 transition-colors'
                          >
                            Cerrar sesión
                          </Link>
                        </p>
                      </div>
                      
                    )}
                </div>
                {isProfileModalOpen && (
                <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                    <Profile onClose={closeProfileModal} cedula={role} />
                </div>
                )}
            </div>
        </header>
        </>

    )
}

export default Dashboardview
