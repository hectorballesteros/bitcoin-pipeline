import React from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const LineChart = () => {
    const data = {
        labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 30, 10, 50],
            borderColor: 'white',
            fontColor: 'white'
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              fontColor: 'white', // Modifica el color de la fuente del eje Y
            },
          },
          x: {
            ticks: {
              fontColor: 'white', // Modifica el color de la fuente del eje X
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              fontColor: 'white', // Modifica el color de la fuente de la leyenda
            },
          },
        },
      };
    
      return (
        <div style={{ margin: '15px' }}>
            <Line data={data} options={options} />
        </div>
      );
    };
export default LineChart;
