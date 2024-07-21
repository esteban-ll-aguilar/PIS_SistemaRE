import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { color } from 'echarts';

const GraficasMateria = () => {
  // Definición de los datos para las categorías de notas, materias y rendimientos
  const data = {
    categories: ['0 a 4.5', '4.6 a 6.9', '7 a 10'], // Categorías de notas
    materias: ['BDD', 'EDD', 'Requisitos SW', 'Estadistica analitica', 'Arq. de Ordenadores'], // Materias
    rendimiento: { // Datos de rendimiento por materia y categoría de notas
      'BDD': [4.4, 7], // Rendimiento para 'Base datos' en cada categoría de notas
      'EDD': [6.3], 
      'Requisitos SW': [7.3], 
      'Estadistica analitica': [9.20],
      'Arq. de Ordenadores': [7.8]
    }
  };

  // Colores para cada categoría de notas
  const colors = ['#FF0000 ', '#FFFC00', '#41FF00 '];

  // Configuración de las opciones para la gráfica
  const option = {
    color: colors, //igualAsigna los colores directamente en las opciones de la gráfica
    tooltip: { // Configuración del tooltip al pasar el mouse sobre la gráfica
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: { // Configuración de la leyenda (legend)
      data: data.categories, // Las categorías como etiquetas de la leyenda
      //virar a 45 grados la leyenda
    },
    xAxis: { // Configuración del eje X (horizontal) //Ahi?
      type: 'category', // Tipo de eje: categoría
      data: data.materias, // Datos para las materias en el eje X
      axislabel: {
        color: '#FF5733',
        rotation: 45, 
      }
    },
    yAxis: { // Configuración del eje Y (vertical)
      type: 'value', 
      name: 'Estudiantes'
    },
    series: data.categories.map((category, index) => ({ // Configuración de las series de datos
      name: category, // Nombre de la serie
      type: 'bar', // Tipo de gráfica: barras
      stack: 'total', // Apilar las barras
      emphasis: { // Efecto de énfasis al interactuar con la serie
        focus: 'series'
      },
      itemStyle: {
        color: colors[index] // Asigna un color a cada categoría de notas
      },
      data: data.materias.map(materia => data.rendimiento[materia][index]) // Datos de rendimiento por materia y categoría de notas
    }))
  };

  return (
    <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="card col-span-1 md:col-span-2 lg:col-span-3 px-4 ">
        <ReactEcharts option={option} style={{ height: '370px', width: '90%' }} /> {/* Componente ReactEcharts con las opciones y estilo */}
      </div>
    </div>
  );
}

export default GraficasMateria;
