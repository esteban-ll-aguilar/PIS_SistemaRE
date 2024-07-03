import React, { useEffect, useState } from "react";


const Pepito = () => {
  const [data, setData] = useState([]);  // establezco un estado de nombre data 

  useEffect(() => { // establecemos el useEffect para registrar los cambios en data
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/rendimiento/ciclo/2");

        if (response.ok) {
          const aux = await response.json(); // si la respuesta de la ruta es ok empezamos a guardar los objetos en el aux
          setData(aux.materias); // el .materias es para poder estar dentro del objeto y operar con sus atributos 
          
          console.log(aux);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []); // Dependencia vacía para ejecutar solo una vez al montar

  return (
    <div>
    materias: {
        data.length > 0 ? (data.map((materias, index) =>
             {
                return (<p key={index} > {materias.nombre}</p>)
              })
        ): null
    }
    </div>
  );
};

export default Pepito;