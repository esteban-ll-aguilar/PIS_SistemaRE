import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Foranix</h1>
        <h2 className="text-2xl font-semibold mb-4 text-center">Integrantes</h2>
        <div className="grid grid-cols-2 gap-4">
          <Link
            to='/iniciosesion'
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center text-center"
          >
            Christian 
          </Link>
          <Link
            to='/graficas'
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 flex items-center justify-center text-center"
          >
            Santiago
          </Link>
          <Link
            to='/informe'
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center text-center"
          >
            Mauricio el pro
          </Link>
          <Link
            to='/interfaz'
            className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 flex items-center justify-center text-center"
          >
            Bradley
          </Link>
        </div>
      </div>
    </div>
    )
}

export default Home;
