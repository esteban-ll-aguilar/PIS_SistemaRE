import React from 'react';
import ReactEcharts from 'echarts-for-react';

const GraficasMateria = ({ materias }) => {
  // Transformar los datos de materias en el formato requerido
  const categories = ['0 a 5', '5 a 7', '7 a 8.5', '8.5 a 10'];
  const materiasKeys = Object.keys(materias[0]);
  const rendimiento = materiasKeys.reduce((acc, materia) => {
    //acc[materia] = categories.map(category => materias[0][materia][category].reduce((a, b) => a + b, 0)/materias[0][materia][category].length);
    acc[materia] = categories.map(category => materias[0][materia][category].reduce((a, b) => a + b,0));
    return acc;
  }, {});

  // Colores para cada categoría de notas
  const colors = ['#FF0000', '#FFFC00', '#41FF00', '#0000FF'];

  // Configuración de las opciones para la gráfica
  const option = {
    color: colors, // Asigna los colores directamente en las opciones de la gráfica
    tooltip: { // Configuración del tooltip al pasar el mouse sobre la gráfica
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: { // Configuración de la leyenda (legend)
      data: categories, // Las categorías como etiquetas de la leyenda
    },
    xAxis: { // Configuración del eje X (horizontal)
      type: 'category', // Tipo de eje: categoría
      data: materiasKeys, // Datos para las materias en el eje X
      axisLabel: {
        color: '#FF5733',
        rotate: 45,
        fontSize: 12,
      }
    },
    yAxis: { // Configuración del eje Y (vertical)
      type: 'value',
      name: 'Estudiantes'
    },
    series: categories.map((category, index) => ({ // Configuración de las series de datos
      name: category, // Nombre de la serie
      type: 'bar', // Tipo de gráfica: barras
      stack: 'total', // Apilar las barras
      emphasis: { // Efecto de énfasis al interactuar con la serie
        focus: 'series'
      },
      itemStyle: {
        color: colors[index] // Asigna un color a cada categoría de notas
      },
      data: materiasKeys.map(materia => rendimiento[materia][index]) // Datos de rendimiento por materia y categoría de notas
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
