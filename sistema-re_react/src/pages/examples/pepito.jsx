import React, { useEffect, useState } from "react";

const Pepito = ({ ciclo }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/rendimiento/ciclo/${ciclo}`);

        if (response.ok) {
          const aux = await response.json();
          setData(aux.materias);
          console.log(aux);
        } else {
          console.error("Error fetching data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ciclo]); // Dependencia de ciclo para ejecutar cada vez que cambie

  return (
    <div>
      <p className="mb-4 text-2xl font-semibold border-[solid] border-[#04344c] border-b-[2px] w-[370px]">materias:</p>{
        data.length > 0 ? (
          data.map((materias, index) => (
            <div key={index} className="mb-4 ml-4  text-xl text-[#04344c]">
              {materias.nombre}
            </div>
          ))
        ) : null
      }
    </div>
  );
};

export default Pepito;
