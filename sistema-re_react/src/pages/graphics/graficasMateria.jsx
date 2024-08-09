import React from 'react';
import ReactECharts from 'echarts-for-react';

const GraficasMateria = ({ materias }) => {
  // Obtener los nombres de todas las materias y asignaturas
  const nombreMaterias = [];
  const dataNumeroCategorias = {
    'U1 de 0 a 5': [],
    'U1 de 5 a 7': [],
    'U1 de 7 a 8.5': [],
    'U1 de 8.5 a 10': [],
    'U2 de 0 a 5': [],
    'U2 de 5 a 7': [],
    'U2 de 7 a 8.5': [],
    'U2 de 8.5 a 10': [],
    'U3 de 0 a 5': [],
    'U3 de 5 a 7': [],
    'U3 de 7 a 8.5': [],
    'U3 de 8.5 a 10': []
  };

  // Procesar las materias y asignaturas
  materias.forEach(materia => {
    Object.keys(materia).forEach(asignatura => {
      nombreMaterias.push(asignatura);
      const datosMateria = materia[asignatura];
      
      Object.keys(datosMateria).forEach(rango => {
        const valores = datosMateria[rango];
        const [u1, u2, u3] = valores;

        dataNumeroCategorias[`U1 de ${rango}`].push(u1);
        dataNumeroCategorias[`U2 de ${rango}`].push(u2);
        dataNumeroCategorias[`U3 de ${rango}`].push(u3);
      });
    });
  });

  // Configuración de la gráfica
  const option = {
    legend: {
      data: [
        'U1 de 0 a 5', 'U1 de 5 a 7', 'U1 de 7 a 8.5', 'U1 de 8.5 a 10',
        'U2 de 0 a 5', 'U2 de 5 a 7', 'U2 de 7 a 8.5', 'U2 de 8.5 a 10',
        'U3 de 0 a 5', 'U3 de 5 a 7', 'U3 de 7 a 8.5', 'U3 de 8.5 a 10'
      ],
      orient: 'horizontal',
      top: '0%',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    xAxis: {
      type: 'category',
      data: nombreMaterias,
      axisLabel: {
        rotate: 20,
        fontSize: 9,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 12,
        color: '#666'
      },
      axisLine: {
        lineStyle: {
          color: '#ccc'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#eee'
        }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params) => {
        let tooltipHtml = <div><strong>${params[0].name}</strong></div>;
        params.forEach(param => {
          tooltipHtml += `
            <div>
              <span style="background-color:${param.color};display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;"></span>
              ${param.seriesName}: ${param.value}
            </div>
          `;
        });
        return tooltipHtml;
      }
    },
    series: [
      {
        data: dataNumeroCategorias['U1 de 0 a 5'],
        type: 'bar',
        stack: 'group1',
        name: 'U1 de 0 a 5',
        itemStyle: {
          color: '#FF0000'
        },
        emphasis: {
          itemStyle: {
            color: '#FF6666'
          }
        }
      },
      {
        data: dataNumeroCategorias['U1 de 5 a 7'],
        type: 'bar',
        stack: 'group1',
        name: 'U1 de 5 a 7',
        itemStyle: {
          color: '#FFFF00'
        },
        emphasis: {
          itemStyle: {
            color: '#FFFF66'
          }
        }
      },
      {
        data: dataNumeroCategorias['U1 de 7 a 8.5'],
        type: 'bar',
        stack: 'group1',
        name: 'U1 de 7 a 8.5',
        itemStyle: {
          color: '#0000FF'
        },
        emphasis: {
          itemStyle: {
            color: '#6666FF'
          }
        }
      },
      {
        data: dataNumeroCategorias['U1 de 8.5 a 10'],
        type: 'bar',
        stack: 'group1',
        name: 'U1 de 8.5 a 10',
        itemStyle: {
          color: '#00FF00'
        },
        emphasis: {
          itemStyle: {
            color: '#66FF66'
          }
        }
      },
      {
        data: dataNumeroCategorias['U2 de 0 a 5'],
        type: 'bar',
        stack: 'group2',
        name: 'U2 de 0 a 5',
        itemStyle: {
          color: '#FF0000'
        },
        emphasis: {
          itemStyle: {
            color: '#FF6666'
          }
        }
      },
      {
        data: dataNumeroCategorias['U2 de 5 a 7'],
        type: 'bar',
        stack: 'group2',
        name: 'U2 de 5 a 7',
        itemStyle: {
          color: '#FFFF00'
        },
        emphasis: {
          itemStyle: {
            color: '#FFFF66'
          }
        }
      },
      {
        data: dataNumeroCategorias['U2 de 7 a 8.5'],
        type: 'bar',
        stack: 'group2',
        name: 'U2 de 7 a 8.5',
        itemStyle: {
          color: '#0000FF'
        },
        emphasis: {
          itemStyle: {
            color: '#6666FF'
          }
        }
      },
      {
        data: dataNumeroCategorias['U2 de 8.5 a 10'],
        type: 'bar',
        stack: 'group2',
        name: 'U2 de 8.5 a 10',
        itemStyle: {
          color: '#00FF00'
        },
        emphasis: {
          itemStyle: {
            color: '#66FF66'
          }
        }
      },
      {
        data: dataNumeroCategorias['U3 de 0 a 5'],
        type: 'bar',
        stack: 'group3',
        name: 'U3 de 0 a 5',
        itemStyle: {
          color: '#FF0000'
        },
        emphasis: {
          itemStyle: {
            color: '#FF6666'
          }
        }
      },
      {
        data: dataNumeroCategorias['U3 de 5 a 7'],
        type: 'bar',
        stack: 'group3',
        name: 'U3 de 5 a 7',
        itemStyle: {
          color: '#FFFF00'
        },
        emphasis: {
          itemStyle: {
            color: '#FFFF66'
          }
        }
      },
      {
        data: dataNumeroCategorias['U3 de 7 a 8.5'],
        type: 'bar',
        stack: 'group3',
        name: 'U3 de 7 a 8.5',
        itemStyle: {
          color: '#0000FF'
        },
        emphasis: {
          itemStyle: {
            color: '#6666FF'
          }
        }
      },
      {
        data: dataNumeroCategorias['U3 de 8.5 a 10'],
        type: 'bar',
        stack: 'group3',
        name: 'U3 de 8.5 a 10',
        itemStyle: {
          color: '#00FF00'
        },
        emphasis: {
          itemStyle: {
            color: '#66FF66'
          }
        }
      }
    ]
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default GraficasMateria;