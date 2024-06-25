import {React, useEffect, useState} from 'react'
import { FaSearch, FaEnvelope, FaRegBell, FaBars, FaChevronRight } from "react-icons/fa"
import profile from "../assets/profile.png"
import { Link } from 'react-router-dom'
import SendEmail from '../pages/examples/envioCorreo';
import Profile from '../pages/examples/gestionPerfil';


const Dashboardview = ({ role, toggleSidebar, acciones, setSelectedComponent, principal }) => {
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

    return (
        <header className='flex items-center justify-between px-6 py-5 border-b border-gray-300 bg-[#4E73DF] shadow-sm dark:bg-blue-950'>
            <div className='flex items-center gap-4 '>
                <button onClick={toggleSidebar} className='p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700  dark:bg-sky-700'>
                    <FaBars />
                </button>
                <div className='flex items-center bg-gray-100 rounded-md overflow-hidden '>
                    <input 
                        type="text" 
                        className='bg-gray-100 h-10 outline-none pl-4 w-72 text-sm ' 
                        placeholder='Buscar...' 
                    />
                    <button className='bg-blue-600 h-10 px-4 flex items-center justify-center text-white dark:bg-sky-700'>
                        <FaSearch />
                    </button>
                    
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-5 border-r pr-6 text-white'>

                    
                    <FaRegBell className='hover:text-blue-600 transition-colors duration-300 cursor-pointer' />
                 

                    <FaEnvelope className='hover:text-blue-600 text-blue-600 transition-colors duration-300 cursor-pointer' onClick={openModal} />
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
                        <div className="relative bg-write p-5 rounded-lg shadow-md">
                            <SendEmail onClose={closeModal} />
                        </div>
                        </div>
                    )}




                </div>
                <div className='relative flex items-center gap-3 cursor-pointer text-white' onClick={showProfile}>
                    <p className='font-medium'>{role}</p>
                    <div className='h-12 w-12 rounded-full bg-transparent overflow-hidden'>
                        <img src={profile} alt="Profile" className='h-full w-full object-cover bg-neutral-200 dark:bg-neutral-300' />
                    </div>
                    {open && (

                        <div className='bg-white border border-gray-300 shadow-lg absolute top-14 right-0 w-40 rounded-md p-3 space-y-2 dark:bg-blue-900'>
                        
                        <p className="cursor-pointer text-blue-600 font-semibold dark:text-zinc-100" onClick={openProfileModal}>     Perfil       </p>
                            
                        
                            <p onClick={toggleModoNoche} className='cursor-pointer text-blue-600 font-semibold dark:text-zinc-100'>Modo Oscuro</p>
                            
                            <Link to='/' className='cursor-pointer text-blue-600 font-semibold  dark:text-zinc-100'>Cerrar sesión</Link>

                        </div>
                    )}
                </div>
                {isProfileModalOpen && (
  <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
    <Profile onClose={closeProfileModal} />
  </div>
)}
            </div>
        </header>

    )
}

export default Dashboardview
