import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const FuncionDocente = () => {
  const [docentes, setDocentes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuncionDocentes = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/funcion_de_docentes', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const responseData = await response.json();
        setDocentes(responseData.docentes);
        console.log(responseData.docentes);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFuncionDocentes();
  }, []);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center dark:bg-slate-700">
      <header className="mb-6 text-center">
        <h4 className="text-2xl dark:text-white font-bold mb-2">Funciones de los docentes</h4>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </header>
      {docentes.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100">
                <th className="py-2 px-4">N-</th>
                <th className="py-2 px-4">Cédula</th>
                <th className="py-2 px-4">Apellidos</th>
                <th className="py-2 px-4">Nombres</th>
                <th className="py-2 px-4">ADMIN.</th>
                <th className="py-2 px-4">DOCENTE</th>
                <th className="py-2 px-4">PERSONAL SEG.</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map((docente, index) => (
                <tr key={index} className="border-t dark:border-gray-700 dark:text-gray-300">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{docente.user.cedula}</td>
                  <td className="py-2 px-4">{docente.user.apellidos}</td>
                  <td className="py-2 px-4">{docente.user.nombres}</td>
                  <td className="py-2 px-4 text-center">
                    {docente.funcion.some(funcion => funcion.descripcion === 'ADMINISTRADOR') && (
                      <FontAwesomeIcon icon={faCheck} className="text-green-500 mx-2" />
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {docente.funcion.some(funcion => funcion.descripcion === 'DOCENTE') && (
                      <FontAwesomeIcon icon={faCheck} className="text-blue-500 mx-2" />
                    )}
                  </td>
                  <td className="py-2 px-4 text-center">
                    {docente.funcion.some(funcion => funcion.descripcion === 'PERSONAL_SEG') && (
                      <FontAwesomeIcon icon={faCheck} className="text-red-500 mx-2" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">
          No se ha asignado funciones a los docentes.
        </div>
      )}
    </div>
  );
};

export default FuncionDocente;
