import React, { useEffect, useState } from 'react';
import ReactEcharts from 'echarts-for-react';
import Cargando from '../../components/funtions/cargando';

const GraficasUnidad = ({ cedula }) => {
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000//notas/materias/docente/${cedula}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        setNotas(data.promediosUnidad);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cedula]);

  const transformData = (data) => {
    return Object.keys(data).map((materia) => {
      const rendimiento = data[materia];
      const categories = Object.keys(rendimiento);
      const unidades = ['Unidad 1', 'Unidad 2', 'Unidad 3'];
      const seriesData = categories.map((category) => ({
        name: category,
        type: 'bar',
        data: unidades.map((_, unitIndex) => rendimiento[category][unitIndex]),
      }));

      return {
        materia,
        option: {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            data: categories,
          },
          grid: {
            top: '10%',
            bottom: '10%',
            left: '3%',
            right: '4%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: unidades,
              axisPointer: {
                type: 'shadow',
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              name: 'Estudiantes',
              min: 0,
              max: 30,
              interval: 5,
              axisLabel: {
                formatter: '{value}',
              },
            },
          ],
          series: seriesData,
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
            orient: 'horizontal',
            top: 'bottom',
            right: '20px',
            itemSize: 15,
            itemGap: 10,
          },
        },
      };
    });
  };

  const graficas = transformData(notas);

  return (
    <>
      {/* <h1 className='text-center text-3xl font-bold p-5'>
        Graficas de las unidades</h1> */}
      {loading ? (
        <Cargando />
      ) : (
        <div className="dashboard flex flex-col gap-4 p-2">
          {graficas.map((grafica) => (
            <div key={grafica.materia} className="card p-4 center">
              <h3 className="text-center mb-4 text-xl"><b>{grafica.materia}</b></h3>
              <div className="flex justify-center">
              <ReactEcharts option={grafica.option} style={{ height: '400px', width: '600px' }} />
              </div>
            </div>
          ))}
        </div>
      )
      }
    </>
  );
};

export default GraficasUnidad;
