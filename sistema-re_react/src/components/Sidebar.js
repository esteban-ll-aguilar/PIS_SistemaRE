import React from 'react'
import { FaTachometerAlt, FaRegSun, FaWrench, FaStickyNote, FaRegChartBar, FaRegCalendarAlt, FaChevronRight, FaChevronLeft, FaBolt,  } from "react-icons/fa"
import { HiAcademicCap, HiOutlineDocumentDuplicate, HiUserGroup, HiViewBoards } from "react-icons/hi"

const Sidebar = () => {
    return (
        <div className='bg-[#4E73DF] px-[25px] h-screen'>
            <div className='px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]'>
                <h1 className='text-white text-[20px] leading-[24px] font-extrabold cursor-pointer'>Panel de Administrador</h1>
            </div>
            <div className='flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3] cursor-pointer'>
                <FaTachometerAlt color='white' />
                <p className='text-[14px] leading-[20px] font-bold text-white'>Principal</p>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> Administar</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <HiViewBoards color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Cursos</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <HiUserGroup color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Docentes</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <HiAcademicCap color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Estudiantes</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
            </div>
            <div className='pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]'>
                <p className='text-[10px] font-extrabold leading-[16px] text-white/[0.4]'> Acciones</p>
                <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <HiOutlineDocumentDuplicate color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Informe</p>
                    </div>
                    <FaChevronRight color='white' />
                </div>
                <div className='flex items-center gap-[10px] py-[15px]  cursor-pointer'>
                    <FaRegChartBar color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Gráficas</p>
                </div>
            </div>
            <div className='pt-[15px]'>
                <div className='flex items-center justify-center'>
                    <div className='h-[40px] w-[40px] bg-[#3C5EC1] rounded-full flex items-center justify-center cursor-pointer'>
                        <FaChevronLeft color='white' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar