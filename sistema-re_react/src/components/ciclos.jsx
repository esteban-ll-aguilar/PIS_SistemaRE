import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ListaCiclos = () => {
  const [ciclos, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('http://127.0.0.1:5000/ciclos', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Data fetched:', data);
        setStudents(data); // Actualiza el estado con la lista de estudiantes
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };

    fetchData(); // Llama a la función fetchData cuando el componente se monta

    // No necesitamos agregar ninguna dependencia al arreglo de dependencias de useEffect
    // porque queremos que este efecto se ejecute solo una vez, al montar el componente.

  }, []); // El arreglo vacío indica que este efecto no tiene dependencias y se ejecutará solo una vez

  return (
    <div className="App min-h-screen bg-gray-100 p-4 dark:bg-slate-700">
    <header className="App-header text-center mb-4">
      <h1 className="text-3xl font-bold mb-2">Cilos actuales</h1>
      {error && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ciclos.length > 0 ? (
          ciclos.map((ciclo, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md">
              <p className="text-xl font-semibold">{ciclo.ciclo} {ciclo.paralelo}</p>
              <Link to={`/ciclos/materias/${ciclo.id}`} className="text-blue-500 hover:underline">Ver detalles</Link>

              {/*<a href={`http://127.0.0.1:5000/ciclos/materias/${ciclo.id}`} className="text-blue-500 hover:underline">Ver materias</a>*/}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center p-4 bg-white rounded-lg shadow-md">
            No hay estudiantes
          </div>
        )}
      </div>
    </header>
  </div>
);
};

export default ListaCiclos;
