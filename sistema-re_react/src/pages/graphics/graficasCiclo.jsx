import React, { useRef, useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';

const GraficasCiclo = ({ rendimientoCiclos }) => {
  const chartRef = useRef(null);
  const [currentOption, setCurrentOption] = useState({});

  // Convertimos los datos de rendimientoCiclos en el formato requerido
  const calificacionesPorCiclo = Object.entries(rendimientoCiclos).map(([ciclo, data]) => ({
    value: data.promedioCiclo,
    name: `Ciclo ${ciclo}`,
  }));

  const defaultPalette = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de'];
  const radius = ['50%', '90%'];

  const pieOption = {
    series: [
      {
        type: 'pie',
        id: 'distribution',
        radius: radius,
        label: {
          show: true,
        },
        universalTransition: true,
        animationDurationUpdate: 1000,
        data: calificacionesPorCiclo,
      },
    ],
  };

  const parliamentOption = (function () {
    let sum = calificacionesPorCiclo.reduce((sum, cur) => sum + cur.value, 0);
    let angles = [];
    let startAngle = -Math.PI / 2;
    let curAngle = startAngle;
    calificacionesPorCiclo.forEach((item) => {
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
        for (
          let k = Math.floor((startAngle * r) / newSize) * newSize;
          k < Math.floor((endAngle * r) / newSize) * newSize - 1e-6;
          k += newSize
        ) {
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
        data: calificacionesPorCiclo,
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
          var points = parliamentLayout(angles[idx], angles[idx + 1], Math.PI * 2, r0, r1, size + 3);
          return {
            type: 'group',
            children: points.map((pt) => ({
              type: 'circle',
              autoBatch: true,
              shape: {
                cx: cx + pt[0],
                cy: cy + pt[1],
                r: size / 2,
              },
              style: {
                fill: defaultPalette[idx % defaultPalette.length],
              },
            })),
          };
        },
      },
    };
  })();

  useEffect(() => {
    setCurrentOption(pieOption);
  }, []); // Este useEffect se ejecuta solo una vez

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOption((prevOption) => (prevOption === pieOption ? parliamentOption : pieOption));
      const chartInstance = chartRef.current.getEchartsInstance();
      chartInstance.setOption(currentOption);
    }, 2000);
    return () => clearInterval(interval);
  }, [pieOption, parliamentOption, currentOption]); // Este useEffect depende de las opciones de gráficos

  return (
    <div>
      <div className="card col-span-1 md:col-span-2 lg:col-span-3 p-4">
        <ReactEcharts ref={chartRef} option={currentOption} style={{ height: '400px', width: '100%' }} />
      </div>
    </div>
  );
};

export default GraficasCiclo;
