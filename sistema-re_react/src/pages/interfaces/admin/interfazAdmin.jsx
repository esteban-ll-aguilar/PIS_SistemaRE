import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import { Outlet } from 'react-router-dom';

const InterfazAdmin = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible)
  }
  // const administrar = [
{/* <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <HiViewBoards color='white' /> <Link className='text-[14px] leading-[20px] font-normal text-white' to='/ciclos'>Cursos</Link>
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
                </div> */}
    // ];
    // const acciones = [
    {/* <div className='flex items-center justify-between gap-[10px] py-[15px] cursor-pointer'>
                    <div className='flex items-center gap-[10px]'>
                        <HiOutlineDocumentDuplicate color='white' /> <Link className='text-[14px] leading-[20px] font-normal text-white' to='/informe'>Informe</Link>
                    </div>
                    <FaChevronRight color='white' />
                </div>
                <Link className='flex items-center gap-[10px] py-[15px] cursor-pointer' to='/graficas'>              
                    <FaRegChartBar color='white' /> <p className='text-[14px] leading-[20px] font-normal text-white'>Gráficas</p>                   
                </Link>  */}
    // ];
  return (
      <section className='flex'>
          <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} role="Administrador" />
          <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'}`}>
              <Dashboardview role='Administrador' toggleSidebar={toggleSidebar} />
              <Outlet />
          </section>
      </section>
      
  )
}

export default InterfazAdmin