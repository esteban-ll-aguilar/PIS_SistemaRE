import React from 'react';
import ReactEcharts from 'echarts-for-react';

const GraficasMateria = () => {
  // Definición de los datos para las categorías de notas, materias y rendimientos
  const data = {
    categories: ['0 a 5', '5 a 7', '7 a 8.5', '8.5 a 10'], // Categorías de notas
    materias: ['Base datos', 'Estructura Datos', 'Requisitos SW', 'Estadistica analitica', 'Arquitectura de Ordenadores'], // Materias
    rendimiento: { // Datos de rendimiento por materia y categoría de notas
      'Base datos': [5, 10, 15, 10], // Rendimiento para 'Base datos' en cada categoría de notas
      'Estructura Datos': [3, 12, 10, 7], 
      'Requisitos SW': [8, 7, 15, 5], 
      'Estadistica analitica': [6, 13, 11, 7],
      'Arquitectura de Ordenadores': [9, 8, 9, 10]
    }
  };

  // Configuración de las opciones para la gráfica
  const option = {
    tooltip: { // Configuración del tooltip al pasar el mouse sobre la gráfica
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: { // Configuración de la leyenda (legend)
      data: data.categories // Las categorías como etiquetas de la leyenda
    },
    xAxis: { // Configuración del eje X (horizontal)
      type: 'category', // Tipo de eje: categoría
      data: data.materias // Datos para las materias en el eje X
    },
    yAxis: { // Configuración del eje Y (vertical)
      type: 'value', // Tipo de eje: valor numérico
      name: 'Estudiantes'
    },
    series: data.categories.map((category, index) => ({ // Configuración de las series de datos
      name: category, // Nombre de la serie
      type: 'bar', // Tipo de gráfica: barras
      stack: 'total', // Apilar las barras
      emphasis: { // Efecto de énfasis al interactuar con la serie
        focus: 'series'
      },
      data: data.materias.map(materia => data.rendimiento[materia][index]) // Datos de rendimiento por materia y categoría de notas
    }))
  };

  return (
    <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="card col-span-1 md:col-span-2 lg:col-span-3 p-4">
        <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} /> {/* Componente ReactEcharts con las opciones y estilo */}
      </div>
    </div>
  );
}

export default GraficasMateria;
