import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
    return (
        <div className="bg-gray-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Foranix</h1>
        <div className="">
          <Link
            to='/iniciosesion'
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center text-center"
          >
            Ingresar 
          </Link>
        </div>
      </div>
    </div>
    )
}

export default Home;
