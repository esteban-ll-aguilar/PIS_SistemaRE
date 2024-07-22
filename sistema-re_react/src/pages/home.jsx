// src/components/HomePage.js

import React from 'react';
import { Link } from 'react-router-dom';
import { FaChartLine, FaBook, FaPen } from 'react-icons/fa';
import logo from '../assets/tapa.png';
import logo2 from '../assets/foranix.png';
const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
        <div className="bg-blue-700 text-white text-center p-4 mt-auto h-[56px]">
          <img src={logo2} alt="logo" className='absolute w-[330px] translate-y-[27%]'/>
        </div>
      {/* Contenido Principal */}
      <main className="bg-slate-100 flex-grow w-[80%] h-[70px] mx-auto p-6 rounded-[25px] ">
        <h2 className="text-3xl mb-6 text-gray-800 text-center font-bold">Bienvenido al Sistema</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        
          <div className="bg-white shadow-2xl rounded-lg mx-5 p-6 hover:shadow-xl transition-shadow duration-300 text-center">
            <FaChartLine className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Resumen de Rendimiento</h3>
            <p className="text-gray-600">Obtén una visión general del rendimiento de los estudiantes con gráficos y estadísticas.</p>
          </div>
          
          <div className="bg-white mx-5 shadow-2xl rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
            <FaBook className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Administrar Materias</h3>
            <p className="text-gray-600">Agrega, edita y organiza las materias en las que los estudiantes están inscritos.</p>
          </div>
          
          <div className="bg-white mx-5 shadow-2xl rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 text-center">
            <FaPen className="text-blue-500 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-4 text-gray-700">Gestionar Calificaciones</h3>
            <p className="text-gray-600">Ingresa y actualiza las calificaciones de los estudiantes de manera eficiente.</p>
          </div>
        </div>
        <div className="flex justify-center mt-6 text-white">
            <Link
              to='/iniciosesion'
              className="bg-blue-500 text-white w-[150px] h-[45px] text-center items-center py-2 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            >
                Ingresar
            </Link>
        </div>
      </main>
      {/* Pie de Página */}
      <footer className="bg-blue-700 text-white text-center p-4 mt-auto">
        <p>&copy; 2024 Sistema de Gestión del Rendimiento Estudiantil. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default HomePage;
