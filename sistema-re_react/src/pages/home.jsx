import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-200 flex items-center justify-center min-h-screen dark:bg-slate-700">
      <div className="bg-white p-8 rounded shadow max-w-md w-full dark:bg-teal-900 dark:text-slate-300 ">
        <h1 className="text-4xl font-bold mb-6 text-center">Foranix</h1>
        <div>
          <Link
            to='/iniciosesion'
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center text-center focus:outline-none dark:bg-sky-900 "
          >
            Ingresar 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
