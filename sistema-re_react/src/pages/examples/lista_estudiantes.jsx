import React, { useState, useEffect } from 'react';

const ListaEstudiantes = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching data...');
        const response = await fetch('http://127.0.0.1:5000/lista_estudiantes', {
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
    <div className="App">
      <header className="App-header">
        <h1>Lista de Estudiantes</h1>
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <ul>
          {students.length > 0 ? (
            students.map((student, index) => (
              <li key={index}>{student.estudianteId} {student.asignacionDocenteId}</li>
            ))
          ) : (
            <li>No hay estudiantes</li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default ListaEstudiantes;
