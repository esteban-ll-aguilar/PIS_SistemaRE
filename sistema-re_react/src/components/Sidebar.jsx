import React, { useState } from 'react'
import { FaTachometerAlt, FaChevronLeft, FaChevronRight, FaRegChartBar } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Sidebar = ({ isVisible, toggleSidebar, role, principal, administrar, acciones, setSelectedComponent }) => {
    const handleClick = (ruta) => {
        // Aquí se puede agregar lógica adicional, como cargar datos necesarios para el componente seleccionado
        setSelectedComponent(ruta);
    };
    return (
        <div className={`bg-[#4E73DF] px-[25px] h-screen transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'} fixed`}>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Panel de {role}</h1>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                {principal.map((item, index) => (
                    <div key={index} className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer' onClick={() => handleClick(item.ruta)}>
                        <div className='flex items-center gap-[10px]'>
                        {item.icono}
                        <Link className='text-[14px] leading-[20px] font-normal text-white'>{item.texto}</Link>
                        </div>
                        <FaChevronRight color='white' />
                    </div>
                ))}

            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>Administar</p>
                {administrar.map((item, index) => (
                    <div key={index} className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer' onClick={() => handleClick(item.ruta)}>
                        <div className='flex items-center gap-[10px]'>
                        {item.icono}
                        <Link className='text-[14px] leading-[20px] font-normal text-white'>{item.texto}</Link>
                        </div>
                        <FaChevronRight color='white' />
                    </div>
                ))}
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'>Acciones</p>
                {acciones.map((accion, index) => (
                    <div key={index} className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer' onClick={() => handleClick(accion.ruta)}>
                        <div className='flex items-center gap-[10px]'>
                        {accion.icono}
                        <Link className='text-[14px] leading-[20px] font-normal text-white'>{accion.texto}</Link>
                        </div>
                        <FaChevronRight color='white' />
                    </div>
                ))}
            </div>
            <div className='pt-[15px]'>
                <div className='flex items-center justify-center'>
                    <div className='h-[40px] w-[40px] bg-[#4E73DF] flex items-center justify-center cursor-pointer rounded-[5px]' onClick={toggleSidebar}>
                        <FaChevronLeft color='white' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
