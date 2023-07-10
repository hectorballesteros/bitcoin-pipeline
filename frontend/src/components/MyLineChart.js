import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';

const LineChart = () => {
  const [prices, setPrices] = useState([0]);
  const [dates, setDates] = useState(['2023-07-10T01:00:00']);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/bitcoin/prices/?time_unit=hour');
          const pricesArray = response.data.map(item => item.price);
          setPrices(pricesArray);
          const datesArray = response.data.map(item => item.price_time);
          setDates(datesArray);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);

      const data = {
        datasets: [
          {
            label: 'Precio BitCoin',
            labelColor : "#fff",
            color: '#ffffff',
            data: dates.map((fecha, index) => ({
              x: new Date(fecha), 
              y: prices[index], 
            })),
            fill: false,
            borderColor: 'white',
            backgroundColor: "blue",
          },
        ],
      };
    
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              color: "white",
            },
          },
          x: {
            type: 'time',
            time: {
              parser: 'YYYY-MM-DDTHH:mm:ss',
              unit: 'hour',
            },
            display: false,
          },
        },
        plugins: {
          legend: {
            labels: {
              fontColor: 'white',
            },
          },
        },
      };
    
      return (
        <div style={{ margin: '15px', height: '250px' }}>
            <Line data={data} options={options} />
        </div>
      );
    };
export default LineChart;