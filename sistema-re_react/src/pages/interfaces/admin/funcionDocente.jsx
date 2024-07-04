import React, { useState, useEffect } from 'react';
const FuncionDocente = () => {
  const [docentes, setdocentes] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchFuncionDocentes = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/funcion_docente`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        setdocentes(responseData.docentes);
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
 {/*  {rubrica.length <= 0 ? (
    <FormCalificaciones idMateria={idMateria} idUnidad={idUnidad} nUnidad={unidad.nunidad} />
  ) : (
    <div className="text-center p-4 bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md w-full max-w-md">Ya se han asignado las Notas.</div>
  )} */}
  {docentes.length > 0 ? (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg text-sm">
        <thead>
          <tr className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-100">
            <th className="py-2 px-4">N-</th>
            <th className="py-2 px-4">Apellidos</th>
            <th className="py-2 px-4">Nombres</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((docente, index) => {
            return (
              <tr key={index} className={`border-t dark:border-gray-700  dark:text-gray-300`}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{docente.nombres}</td>
                <td className="py-2 px-4">{docente.apellidos}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">No se ha asignado funciones a los docentes.</div>
  )}
</div>

  );
};

export default FuncionDocente;
