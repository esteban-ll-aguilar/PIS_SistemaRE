import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormCalificaciones from '../pages/interfaces/docente/formCalificaciones';
const Calificaciones = () => {
  const { idMateria, idUnidad } = useParams();
  const [unidad, setUnidad] = useState({});
  const [estudiantes, setEstudiantes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCursa = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/estudiantes/calificaciones/materia/${idMateria}/unidad/${idUnidad}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        setEstudiantes(responseData.estudiantes);
        setUnidad(responseData.unidad[0]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCursa();
  }, [idMateria, idUnidad]);

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <header className="mb-6 text-center">
        <h4 className="text-2xl font-bold mb-2">Calificaciones Unidad {unidad.nunidad}</h4>
        <p className="text-lg">{unidad.nombre}</p>
        {error && <p className="text-red-500 mt-2">Error: {error}</p>}
      </header>
      {1>0 ? (
        <FormCalificaciones idMateria={idMateria} idUnidad={idUnidad} nUnidad={unidad.nunidad}/>
      ) : (
        <div className="text-center p-4 bg-white rounded-lg shadow-md w-full max-w-md">No hay calificaciones disponibles.</div>
      )}
      {estudiantes.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg text-sm">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="py-2 px-4">N-</th>
                <th className="py-2 px-4">Apellidos</th>
                <th className="py-2 px-4">Nombres</th>
                <th className="py-2 px-4">Contacto Docente</th>
                <th className="py-2 px-4">Aprendizaje Experimental</th>
                <th className="py-2 px-4">Aprendizaje Autonomo</th>
                <th className="py-2 px-4">Evaluación Unidad</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((estudiante, index) => (
                <tr key={index} className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{estudiante.user_apellidos}</td>
                  <td className="py-2 px-4">{estudiante.user_nombres}</td>
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4"></td>
                  <td className="py-2 px-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-4 bg-white rounded-lg shadow-md w-full max-w-md">No hay calificaciones disponibles.</div>
      )}
    </div>
  );
};

export default Calificaciones;
