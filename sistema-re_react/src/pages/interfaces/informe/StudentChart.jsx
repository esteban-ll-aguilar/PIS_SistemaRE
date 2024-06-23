import React from 'react';
import ReactEcharts from 'echarts-for-react';

const StudentChart = ({ data }) => {
    const option = {
        title: {
            text: 'Gráfico de Notas de Estudiantes',
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                type: 'bar',
                data: data.map(item => item.grade),
            },
        ],
    };

    return <ReactEcharts option={option} />;
};

export default StudentChart;
