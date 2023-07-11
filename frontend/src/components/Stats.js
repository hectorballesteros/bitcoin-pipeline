import React, { useEffect, useState } from 'react'
import './Stats.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import "rsuite/dist/rsuite.min.css";
import { mean, median, max, min, floor, divide } from 'mathjs';
import { format, addDays, subDays } from 'date-fns';
import moment from 'moment';



export const Stats = () => {
    const [stats, setStats] = useState({
        average: 0,
        median: 0,
        max: 0,
        min: 0
      });

    const [buttonText, setButtonText] = useState('Histórico');
    useEffect(() => {
        const dateToday = moment().utc().format('YYYY-MM-DD');
        console.log(dateToday);
        const dateTodayAux = format(addDays(new Date(dateToday), 2), 'yyyy-MM-dd');
        const dateWeekAgo = format(subDays(new Date(dateToday), 7), 'yyyy-MM-dd');
        if (buttonText === 'Histórico') {
            const fetchData = async () => {
                try {
                    const response = await axios.get('/bitcoin');
                    const prices = response.data.map(item => item.price);
                    const newStats = {
                        average: divide(floor(mean(prices)*100), 100),
                        median: divide(floor(median(prices)*100), 100),
                        max: divide(floor(max(prices)*100), 100),
                        min: divide(floor(min(prices)*100), 100)
                    };                   
                    setStats(newStats);
                } catch (error) {
                    console.log(error);
                }
            };
                fetchData();
        } else if (buttonText === 'Hoy') {
            const fetchData = async () => {
            try {     
                    const response = await axios.get(`/bitcoin/prices/?end_date=${dateTodayAux}&start_date=${dateToday}`);
                    const prices = response.data.map(item => item.price);
                    const newStats = {
                        average: divide(floor(mean(prices)*100), 100),
                        median: divide(floor(median(prices)*100), 100),
                        max: divide(floor(max(prices)*100), 100),
                        min: divide(floor(min(prices)*100), 100)
                    };    
                    setStats(newStats);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        } else if (buttonText === 'Últimos 2 días') {
            const fetchData = async () => {
            try {     
                    const response = await axios.get(`/bitcoin/prices/?end_date=${dateTodayAux}&start_date=${dateWeekAgo}`);
                    const prices = response.data.map(item => item.price);
                    const newStats = {
                        average: divide(floor(mean(prices)*100), 100),
                        median: divide(floor(median(prices)*100), 100),
                        max: divide(floor(max(prices)*100), 100),
                        min: divide(floor(min(prices)*100), 100)
                    };    
                    setStats(newStats);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [buttonText]);
      
    const handleButtonClick = () => {
        if (buttonText === 'Histórico') {
          setButtonText('Hoy');
        } else if (buttonText === 'Hoy') {
          setButtonText('Últimos 2 días');
        } else {
          setButtonText('Histórico');
        }
      };

    return (
        <div>
            <div style={{ marginTop: 5 }}>
                <h4>Métricas Bitcoin</h4>
            </div>
            <hr width="75%" className='MarginAuto' />
            <div>
                <button onClick={handleButtonClick} 
                type="button" 
                class="btn btn-dark">{buttonText}</button>
            </div>
            <div style={{ paddingBottom: 20, paddingLeft: 20, paddingRight: 20 }}>
                <div className="row">
                    <div className='ContainerStat col-md-5'>
                        <strong>Promedio</strong>
                        <h2>{ stats.average }</h2>
                    </div>
                    <div className='ContainerStat col-md-5'>
                    <strong>Mediana</strong>
                        <h2>{ stats.median }</h2>
                    </div>
                </div>
                <div className="row">
                    <div className='ContainerStat col-md-5'>
                    <strong>Máximo</strong>
                        <h2>{ stats.max }</h2>
                    </div>
                    <div className='ContainerStat col-md-5'>
                    <strong>Mínimo</strong>
                        <h2>{ stats.min }</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
