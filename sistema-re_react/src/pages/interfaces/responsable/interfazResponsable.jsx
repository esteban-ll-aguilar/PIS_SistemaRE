import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar';
import Dashboardview from '../../../components/Dashboardview';
import { Outlet } from 'react-router-dom';

const InterfazDocente = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true)

  const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible)
  }

  return (
      <section className='flex'>
          <Sidebar isVisible={isSidebarVisible} toggleSidebar={toggleSidebar} role='Responsable' />
          <section className={`flex flex-col w-full transition-all duration-300 ${isSidebarVisible ? 'ml-[270px]' : 'ml-0'}`}>
              <Dashboardview role='Responsable' toggleSidebar={toggleSidebar} />
              <Outlet />
          </section>
      </section>
      
  )
}

export default InterfazDocente