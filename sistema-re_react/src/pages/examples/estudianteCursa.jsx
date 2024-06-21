import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const EstudianteCursa = () => {
  const { id } = useParams();
  const [Cursa, setCursa] = useState([]);
  const [error, setError] = useState(null);
  const [data, setData] = useState({}); // Agrega data al estado inicial
  const [materia, setMateria] = useState({}); // Agrega materia al estado inicial
  useEffect(() => {
    const fetchCursa = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/estudiantes/materia/${id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const responseData = await response.json();
        setCursa(responseData.estudiante);
        setData(responseData.cursa); // Actualiza data con la respuesta de la API
        setMateria(responseData.materia); // Actualiza materia con la respuesta de la API
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };

    fetchCursa();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className=" mb-4">
        <h1 className="text-3xl text-center font-bold mb-2">{materia.nombre} Paralelo: "{data.paralelo}"</h1>
        {error && <p className="text-red-500">Error: {error}</p>}
        {Cursa.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="py-2 px-4">N-</th>
                  <th className="py-2 px-4">Nombres</th>
                  <th className="py-2 px-4">Apellidos</th>
                  <th className="py-2 px-4">Paralelo</th>
                  <th className="py-2 px-4">Cédula del Docente</th>
                </tr>
              </thead>
              <tbody>
                {Cursa.map((cursa, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{cursa.user_nombres}</td>
                    <td className="py-2 px-4">{cursa.user_apellidos}</td>
                    <td className="py-2 px-4">{cursa.paralelo}</td>
                    <td className="py-2 px-4">{cursa.docente_user_cedula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-4 bg-white rounded-lg shadow-md">
            No hay estudiantes cursando esta materia
          </div>
        )}
      </header>
    </div>
  );
};

export default EstudianteCursa;
