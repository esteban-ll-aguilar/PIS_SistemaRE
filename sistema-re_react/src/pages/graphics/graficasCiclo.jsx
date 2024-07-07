import React, { useRef, useState, useEffect } from 'react'; // estas son las que tengo que quitar por que no es del docente
import ReactEcharts from 'echarts-for-react';

const GraficasCiclo = ({ onSelectCiclo }) => {
  const chartRef = useRef(null);
  const [ciclos, setCiclos] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  useEffect(() => {
    const fetchCiclos = async () => {
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
    fetchCiclos();
  }, []);

  const calificaciones_por_materia = [
    { value: 6.70, name: 'MATEMÁTICAS DISCRETAS' },
    { value: 7.09, name: 'REDACCIÓN' },
    { value: 9.03, name: 'ALGEBRA LINEAL' },
    { value: 8.04, name: 'ELETRICIDAD' },
    { value: 7.00, name: 'TEORIA DE LA PROGRAMACIÓN' }
  ];

  const defaultPalette = [
    '#5470c6', '#91cc75', '#fac858', '#ee6666', 
    '#73c0de'
  ];

  const radius = ['50%', '90%'];

  const pieOption = {
    series: [
      {
        type: 'pie',
        id: 'distribution',
        radius: radius,
        label: {
          show: true
        },
        universalTransition: true,
        animationDurationUpdate: 1000,
        data: calificaciones_por_materia
      }
    ]
  };

  const parliamentOption = (function () {
    let sum = calificaciones_por_materia.reduce((sum, cur) => sum + cur.value, 0);
    let angles = [];
    let startAngle = -Math.PI / 2;
    let curAngle = startAngle;
    calificaciones_por_materia.forEach(item => {
      angles.push(curAngle);
      curAngle += (item.value / sum) * Math.PI * 2;
    });
    angles.push(startAngle + Math.PI * 2);

    function parliamentLayout(startAngle, endAngle, totalAngle, r0, r1, size) {
      let rowsCount = Math.ceil((r1 - r0) / size);
      let points = [];
      let r = r0;
      for (let i = 0; i < rowsCount; i++) {
        let totalRingSeatsNumber = Math.round((totalAngle * r) / size);
        let newSize = (totalAngle * r) / totalRingSeatsNumber;
        for (let k = Math.floor((startAngle * r) / newSize) * newSize;
             k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
             k += newSize) {
          let angle = k / r;
          let x = Math.cos(angle) * r;
          let y = Math.sin(angle) * r;
          points.push([x, y]);
        }
        r += size;
      }
      return points;
    }

    return {
      series: {
        type: 'custom',
        id: 'distribution',
        data: calificaciones_por_materia,
        coordinateSystem: undefined,
        universalTransition: true,
        animationDurationUpdate: 1000,
        renderItem: function (params, api) {
          var idx = params.dataIndex;
          var viewSize = Math.min(api.getWidth(), api.getHeight());
          var r0 = ((parseFloat(radius[0]) / 100) * viewSize) / 2;
          var r1 = ((parseFloat(radius[1]) / 100) * viewSize) / 2;
          var cx = api.getWidth() * 0.5;
          var cy = api.getHeight() * 0.5;
          var size = viewSize / 50;
          var points = parliamentLayout(
            angles[idx],
            angles[idx + 1],
            Math.PI * 2,
            r0,
            r1,
            size + 3
          );
          return {
            type: 'group',
            children: points.map(pt => ({
              type: 'circle',
              autoBatch: true,
              shape: {
                cx: cx + pt[0],
                cy: cy + pt[1],
                r: size / 2
              },
              style: {
                fill: defaultPalette[idx % defaultPalette.length]
              }
            }))
          };
        }
      }
    };
  })();

  useEffect(() => {
    let currentOption = pieOption;
    const interval = setInterval(() => {
      currentOption = currentOption === pieOption ? parliamentOption : pieOption;
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.setOption(currentOption);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
          <div className="card col-span-1 md:col-span-2 lg:col-span-3 p-4">
            <ReactEcharts ref={chartRef} option={pieOption} style={{ height: '400px', width: '100%' }} />
          </div>
        <div>
          {ciclos.length > 0 ? (
            ciclos.map((ciclo, index) => (
              <div key={index} className="flex relative items-center bg-white mb-4 py-4 h-[120px] w-[50%] rounded-lg shadow-md">
                <div className="ml-2 mt-2 absolute left-0 top-0">
                  <p className="text-4x1 font-semibold text-gray-500 dark:text-black">
                    Ciclo {ciclo}
                  </p>
                   
                </div>
                <div className=' mx-2 mb-[10px] absolute right-0 bottom-0'>
                  <button onClick={() => setMostrarContenido(!mostrarContenido)}
                    className="text-white rounded-full text-center bg-[#529914] p-4">
                    {mostrarContenido ? 'Ocultar Contenido' : 'Mostrar Contenido'}
                    {mostrarContenido && (
                    <div className='contenido bg-black w-full'>
                      Este es el contenido desplegado.
                    </div>
                  )}
                  </button >    
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center p-4 bg-white dark:bg-gray-500 rounded-lg shadow-md">
              <p className="text-gray-700 dark:text-white">No hay ciclos</p>
            </div>
          )}
        </div>
      </div>
  );
};

export default GraficasCiclo;
