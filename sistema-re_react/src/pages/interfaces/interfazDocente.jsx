import React from 'react'
import SidebarDocente from '../../components/SidebarDocente';
import Dashboardview from '../../components/Dashboardview';
import { Outlet } from 'react-router-dom';

export const InterfazDocente = () => {
  return (
      <div className="min-h-screen flex">
        <div className="basis-[12%] h-[100vh]">
          <SidebarDocente />
      </div>

      <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <Dashboardview />
          <div>
            <Outlet></Outlet>
          </div>
      </div>


    </div>
  )
}
