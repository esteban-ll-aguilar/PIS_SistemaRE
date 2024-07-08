import React, { useRef, useState, useEffect } from 'react'; // esta es la que se despliega, esta si vale
import ReactEcharts from 'echarts-for-react';
import GraficaPorMaterias from './GraficaPorMateria';
import Pepito from '../pages/examples/pepito';
import GraficasCiclo from '../pages/graphics/graficasCiclo';
import GraficasMateria from '../pages/graphics/graficasMateria';

const TarjetaGraficasAdmin = () => {
  const chartRef = useRef(null);
  const [ciclos, setCiclos] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarContenido, setMostrarContenido] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const graficasAdmin = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/ciclos', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Error con el servidor: ${response.statusText}');
        }
        const data = await response.json();
        setCiclos(data.ciclos); // Actualiza el estado con la lista de ciclos
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message); // Maneja el error
      }
    };
    graficasAdmin();
  }, []);

  return (
    <div className=" ml-10 App p-10 min-h-screen bg-[#f1f1f1] dark:bg-slate-700">
        {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
        <div className="bucle">
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <div key={index}className="h-[550px] w-full bg-white p-2 rounded-lg shadow-md mb-6 relative">
                <div className='justify-center absolute left-0 top-0  m-6'>
                  <h2 className="text-4xl flex-1 font-bold text-[#04344c]">Ciclo {ciclo}</h2> 
                </div>
                <div className='bg-[#f1f1f1] mt-20 h-[450px] rounded-[25px] flex'>
                  <div className='flex-1 p-4 items-center w-[35%] text-[#04344c]'>
                    <Pepito ciclo={index + 1}/>
                  </div>
                  <div className='w-[65%]  justify-center items-center rounded-tr-lg rounded-br-lg border-l-solid border-l-[4px] boder-l-[#04344c]'>
                    <GraficasMateria />
                  </div>
                </div>
              </div>
            ))) : (
            <div className="col-span-full text-center p-4 bg-white dark:bg-gray-500 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-black">No hay ciclos</p>
            </div>
          )}
        </div>
    </div>
  );
};

export default TarjetaGraficasAdmin;    