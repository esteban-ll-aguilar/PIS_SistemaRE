import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const FuncionDocente = () => {
  const { idMateria, idUnidad } = useParams();
  const [unidad, setUnidad] = useState({});
  const [docentes, setdocentes] = useState([]);
  const [rubrica, setrubrica] = useState([]); // Agrega Rubrica al estado inicial
  const [calificaciones, setCalificaciones] = useState([]); // Agrega calificaciones al estado inicial
  const [error, setError] = useState(null);
  const rubricaContain = ["Contacto Docente", "Aprendizaje Experimental", "Aprendizaje Autonomo", "Evaluación Unidad"]
  let totalUnidad = 0;
  useEffect(() => {
    const fetchCursa = async () => {
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
        setUnidad(responseData.unidad[0]);
        setrubrica(responseData.rubrica); // Actualiza rubrica con la respuesta de la API
        setCalificaciones(responseData.calificaciones); // Actualiza calificaciones con la respuesta de la API
        console.log(responseData.calificaciones);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchCursa();
  }, [idMateria, idUnidad]);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center dark:bg-slate-700">
  <header className="mb-6 text-center">
    <h4 className="text-2xl dark:text-white font-bold mb-2">Calificaciones Unidad {unidad.nunidad}</h4>
    <p className="text-lg">{unidad.nombre}</p>
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
            {rubrica.map((rubrica, index) => (
              <th key={index} className="py-2 px-4">{rubricaContain[index]} ({rubrica.descripcion})</th>
            ))}
            <th className="py-2 px-4">Total Unidad</th>
          </tr>
        </thead>
        <tbody>
          {docentes.map((estudiante, index) => {
            let totalUnidad = 0;
            return (
              <tr key={index} className={`border-t dark:border-gray-700  dark:text-gray-300`}>
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{estudiante.user_apellidos}</td>
                <td className="py-2 px-4">{estudiante.user_nombres}</td>
                
                <td className={`py-2 px-4 text-center dark:text-black ${totalUnidad >= 7 ? 'bg-green-200 dark:bg-green-400 ' : 'bg-red-200 dark:bg-red-500'}`}>{totalUnidad.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md">No hay calificaciones disponibles.</div>
  )}
</div>



  );
};

export default FuncionDocente;