import React, {useState, useEffect} from 'react';
import GraficasCiclo from '../graphics/graficasCiclo';
import GraficasUnidad from './graficasUnidad';
import GraficasMateria from './graficasMateria';
import { use } from 'echarts';



export const Graficas = () => {
  
  return (
    <div>
      <div className='dashboard gap-4 p-4' > 
      <div className=" bg-white card col-span-1 md:col-span-2 lg:col-span-3 p-4 dark:bg-sky-900 dark:text-white rounded-md" >
        <div className="stat dark:bg-sky-900 ">
          <h2 className='text-2xl font-bold text-center mt-4'>Rendimiento Academico Estudiantil</h2>
          <p className='text-center'>Gráfica del rendimiento estudiantil por ciclo de la carrera de computacion, seleccione el ciclo para obervar su rendimiento</p>
          <GraficasCiclo>
          </GraficasCiclo>
        </div>
        <div className="chart"></div>
      </div>
      

      <div className="  bg-white  card col-span-1 mt-4 md:col-span-2 lg:col-span-3 p-3 color   dark:bg-sky-900  dark:text-white rounded-md" >
        <div className="text-2xl chart-title font-bold text-center mt-4">Rendimiento del ciclo por materias</div>
        <div className="line-chart"></div>
        <GraficasMateria></GraficasMateria>
      </div>
      </div>

    <div className="dashboard grid  md:grid-cols-2 lg:grid-cols-2 gap-4 p-4 dark:text-white">
      <div className="card p-4 rounded-md bg-white  dark:bg-sky-900 " >
        <div className="stat">
          <h2 className='text-center font-bold'>Estructura de datos</h2>
          <GraficasUnidad></GraficasUnidad>
        </div>
        <div className="chart"></div>
      </div>

      <div className="card p-4 rounded-md bg-white  dark:bg-sky-900 dark:text-white" >
        <div className="stat">
        <h2 className='text-center font-bold'>Base de Datos</h2>
        <GraficasUnidad></GraficasUnidad>
        </div>
        <div className="chart"></div>
      </div>

      <div className="card p-4 rounded-md bg-white  dark:bg-sky-900 dark:text-white ">
        <div className="stat">
          <h2 className='text-center font-bold'>Requisitos de Software</h2>
          <GraficasUnidad></GraficasUnidad>
        </div>
        <div className="chart"></div>
      </div>

      <div className="card p-4 rounded-md bg-white  dark:bg-sky-900 dark:text-white">
        <div className="stat">
        <h2 className='text-center font-bold'>Arquitectura de Ordenadores</h2>
        <GraficasUnidad></GraficasUnidad>
        </div>
        <div className="chart"></div>
      </div>

      <div className="card p-4 rounded-md bg-white  dark:bg-sky-900 dark:text-white">
        <div className="stat">
          <h2 className='text-center font-bold'>Estadistica Analitica</h2>
          <GraficasUnidad></GraficasUnidad>
        </div>
        <div className="chart"></div>
      </div>
    </div>

     
    </div>
  );
}

export default Graficas;
