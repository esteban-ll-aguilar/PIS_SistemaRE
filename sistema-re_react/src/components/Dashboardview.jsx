import React, { useState } from 'react'
import { FaSearch, FaEnvelope, FaRegBell, FaBars } from "react-icons/fa"
import profile from "../assets/profile.png"

const Dashboardview = ({ role, toggleSidebar }) => {
    const [open, setOpen] = useState(false)

    const showProfile = () => {
        setOpen(!open)
    }

    return (
        <header className='flex items-center justify-between px-6 py-4 border-b border-gray-300 bg-[#32465B] shadow-sm'>
            <div className='flex items-center gap-4'>
                <button onClick={toggleSidebar} className='p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300'>
                    <FaBars />
                </button>
                <div className='flex items-center bg-gray-100 rounded-md overflow-hidden'>
                    <input 
                        type="text" 
                        className='bg-gray-100 h-10 outline-none pl-4 w-72 text-sm' 
                        placeholder='Buscar...' 
                    />
                    <button className='bg-blue-600 h-10 px-4 flex items-center justify-center text-white'>
                        <FaSearch />
                    </button>
                </div>
            </div>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-5 border-r pr-6 text-white'>
                    <FaRegBell className='hover:text-blue-600 transition-colors duration-300 cursor-pointer' />
                    <FaEnvelope className='hover:text-blue-600 transition-colors duration-300 cursor-pointer' />
                </div>
                <div className='relative flex items-center gap-3 cursor-pointer text-white' onClick={showProfile}>
                    <p className='font-medium'>{role}</p>
                    <div className='h-12 w-12 rounded-full bg-blue-600 overflow-hidden'>
                        <img src={profile} alt="Profile" className='h-full w-full object-cover' />
                    </div>
                    {open && (
                        <div className='bg-white border border-gray-300 shadow-lg absolute top-14 right-0 w-40 rounded-md p-3 space-y-2'>
                            <p className='cursor-pointer hover:text-blue-600 font-semibold'>Perfil</p>
                            <p className='cursor-pointer hover:text-blue-600 font-semibold'>Configuración</p>
                            <p className='cursor-pointer hover:text-blue-600 font-semibold'>Cerrar sesión</p>
                        </div>
                    )}
                </div>
            </div>
        </header>

    )
}

export default Dashboardview
