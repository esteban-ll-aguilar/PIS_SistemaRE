// src/components/TarjetaGraficasAdmin.js
import React, { useState, useEffect } from 'react';
import Pepito from '../pages/examples/pepito';
import GraficasMateria from '../pages/graphics/graficasMateria';
import { PDFDownloadLink } from '@react-pdf/renderer';
import html2canvas from 'html2canvas';
import MyDocument from '../pages/interfaces/informe/mydocument';

const TarjetaGraficasAdmin = () => {
  const [ciclos, setCiclos] = useState([]);
  const [error, setError] = useState(null);
  const [imageSources, setImageSources] = useState([]);

  useEffect(() => {
    const graficasAdmin = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/ciclos', {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Error con el servidor: ${response.statusText}`);
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

  const captureImages = async () => {
    const images = await Promise.all(
      ciclos.map((_, index) => {
        const element = document.getElementById(`ciclo-${index}`);
        return html2canvas(element).then(canvas => canvas.toDataURL('image/png'));
      })
    );
    setImageSources(images);
  };

  useEffect(() => {
    if (ciclos.length > 0) {
      captureImages();
    }
  }, [ciclos]);

  return (
    <div className="ml-10 App p-4 min-h-screen  bg-[#f1f1f1] dark:bg-slate-700 relative">
      {error && <p className="text-red-500 dark:text-red-400">Error: {error}</p>}
      <div className="bucle mb-40">
        {ciclos.length > 0 ? (
          ciclos.map((ciclo, index) => (
            <div key={index} id={`ciclo-${index}`} className="h-[650px] w-full bg-white p-2 rounded-lg shadow-md mb-6 relative">
              <div className='justify-center absolute left-0 top-0  m-6'>
                <h2 className="text-4xl flex-1 font-bold text-[#04344c]">Ciclo {ciclo}</h2> 
              </div>
              <div className='bg-[#f1f1f1] mt-20 h-[550px] rounded-[25px] flex'>
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
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 text-center p-8 bg-white dark:bg-slate-700 z-10">
        <p className="mb-4 text-lg">Haz clic en el botón de abajo para descargar el PDF con las gráficas.</p>
        <PDFDownloadLink
          document={<MyDocument imageSources={imageSources} />}
          fileName="graficas.pdf"
          className="p-2 bg-blue-500 text-white rounded"
        >
          {({ blob, url, loading, error }) => (loading ? 'Cargando documento...' : 'Descargar PDF')}
        </PDFDownloadLink>
      </div>
      </div>
      
    </div>
  );
};

export default TarjetaGraficasAdmin;
