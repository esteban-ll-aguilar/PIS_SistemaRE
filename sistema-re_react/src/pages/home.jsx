import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded shadow max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Foranix</h1>
        <div>
          <Link
            to='/iniciosesion'
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center text-center focus:outline-none"
          >
            Ingresar 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
