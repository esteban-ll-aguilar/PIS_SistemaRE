import React, {useState} from 'react';
import { FaChevronLeft, FaChevronRight, FaInfo } from 'react-icons/fa';
import logo from '../assets/tapa.png';
import '../styles/sidebar.css';

const Sidebar = ({ isVisible, toggleSidebar, role, principal, administrar, acciones, setSelectedComponent, panel = '' }) => {
  const handleClick = (ruta) => {
    setSelectedComponent(ruta);
  };
  
  return (
    <div
      className={`bg-[#04344c] px-[45px] py-[29px] w-[350px] h-screen overflow-y-auto transition-transform duration-300 ${isVisible ? 'translate-x-0' : '-translate-x-full'} fixed shadow-2xl dark:bg-blue-950 z-50 scrollbar-hide`}
    >
      <div className="px-[1x] py-[28px] flex items-center justify-center">
        <img src={logo} alt="logo" className="w-40" />
      </div>

      <div className="px-[15px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-[20px] leading-[20px] font-extrabold cursor-pointer">{panel}</h1>
        <h1 className="text-white text-[20px] leading-[0px] font-extrabold cursor-pointer">{role}</h1>
      </div>

      <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        {principal.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-[10px] py-[15px] hover:bg-[#0491d1] cursor-pointer rounded-lg"
            onClick={() => handleClick(item.ruta)}
          >
            <div className="flex items-center gap-[10px]">
              {item.icono}
              <span className="text-[14px] text-white leading-[20px] font-normal hover:bg-[#0491d1]">
                {item.texto}
              </span>
            </div>
            <FaChevronRight color="white" />
          </div>
        ))}
      </div>

      {administrar.length > 0 && (
        <div className="pt-[15px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">Administrar</p>
        {administrar.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-[#0491d1] rounded-lg"
            onClick={() => handleClick(item.ruta)}
          >
            <div className="flex items-center gap-[10px]">
              {item.icono}
              <span className="text-[14px] leading-[20px] font-normal text-white">
                {item.texto}
              </span>
            </div>
            <FaChevronRight color="white" />
          </div>
        ))}
      </div>
      )}

      <div className="pt-[10px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <p className="text-[10px] font-extrabold leading-[16px] text-white/[0.4]">Acciones</p>
        {acciones.map((accion, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-[10px] py-[15px] cursor-pointer hover:bg-[#0491d1] rounded-lg"
            onClick={() => handleClick(accion.ruta)}
          >
            <div className="flex items-center gap-[10px]">
              {accion.icono}
              <span className="text-[14px] leading-[20px] font-normal text-white">
                {accion.texto}
              </span>
            </div>
            <FaChevronRight color="white" />
          </div>
        ))}
      </div>

      <div className="pt-[10px]">
        <div className="flex items-center justify-center">
          <div className="h-[40px] w-[40px] bg-[#529914] flex items-center justify-center cursor-pointer rounded-[5px] dark:bg-sky-700" onClick={toggleSidebar}>
            <FaChevronLeft color="white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
