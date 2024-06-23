import React from 'react';
import ReactEcharts from 'echarts-for-react';

const GraficasUnidad = () => {
  // Datos para las categorías, unidades y rendimientos
  const data = {
    categories: ['0 a 5', '5 a 7', '7 a 8.5', '8.5 a 10'],
    unidades: ['Unidad 1', 'Unidad 2', 'Unidad 3'],
    rendimiento: {
      '0 a 5': [3, 2, 4],
      '5 a 7': [7, 8, 6],
      '7 a 8.5': [15, 16, 14],
      '8.5 a 10': [5, 4, 6]
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
    grid: { // Configuración del grid donde se dibuja la gráfica
      top: '10%',    // Margen superior del grid
      bottom: '10%', // Margen inferior del grid
      left: '3%',    // Margen izquierdo del grid
      right: '4%',   // Margen derecho del grid
      containLabel: true // Ajusta automáticamente las etiquetas para que no se superpongan
    },
    xAxis: [ // Configuración del eje X (horizontal)
      {
        type: 'category', // Tipo de eje: categoría
        data: data.unidades, // Datos para las unidades en el eje X
        axisPointer: {
          type: 'shadow' // Tipo de puntero en el eje X
        }
      }
    ],
    yAxis: [ // Configuración del eje Y (vertical)
      {
        type: 'value', // Tipo de eje: valor numérico
        name: 'Estudiantes', // Nombre del eje Y
        min: 0,   // Valor mínimo en el eje Y
        max: 30,  // Valor máximo en el eje Y
        interval: 5, // Intervalo entre los valores en el eje Y
        axisLabel: {
          formatter: '{value}' // Formato de etiquetas en el eje Y
        }
      }
    ],
    series: data.categories.map((category) => ({ // Configuración de las series de datos
      name: category, // Nombre de la serie
      type: 'bar',    // Tipo de gráfica: barras
      data: data.unidades.map((_, unitIndex) => data.rendimiento[category][unitIndex]) // Datos de rendimiento por unidad y categoría
    })),
    toolbox: { // Configuración de la caja de herramientas (toolbox)
      show: true, // Mostrar la caja de herramientas
      feature: { // Funcionalidades disponibles en la caja de herramientas
        dataView: { show: true, readOnly: false }, // Vista de datos (permite ver los datos)
        magicType: { show: true, type: ['line', 'bar'] }, // Cambio de tipo de gráfica entre línea y barras
        restore: { show: true }, // Restaurar vista original
        saveAsImage: { show: true } // Guardar como imagen
      },
      orient: 'horizontal', // Orientación horizontal de la caja de herramientas
      top: 'bottom', // Posición en la parte inferior del gráfico
      right: '20px', // Distancia desde el borde derecho
      itemSize: 15,  // Tamaño de los íconos en la caja de herramientas
      itemGap: 10    // Espaciado entre los íconos en la caja de herramientas
    }
  };

  return (
    <div className="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <div className="card col-span-1 md:col-span-2 lg:col-span-3 p-4">
        <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />
      </div>
    </div>
  );
}

export default GraficasUnidad;
