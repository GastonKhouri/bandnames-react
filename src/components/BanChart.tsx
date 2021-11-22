import { useEffect, useContext } from 'react';
import { Chart, ChartItem, registerables } from "chart.js";

import { SocketContext } from '../context/socketContext';
import { Band } from '../interfaces/bandsInterface';

Chart.register(...registerables);

let myChart: Chart;

const BanChart = () => {

    const { socket } = useContext( SocketContext );

    useEffect(() => {

        socket.on('current-bands', ( bands: Band[] ) => {
            if ( myChart ) {
                myChart.destroy();
            }
            createChart( bands );
        });

        return () => { 
            socket.off('current-bands');
        }
        
    }, [ socket ]);

    const createChart = ( bands: Band[] ) => {
        
        const ctx = document.getElementById('myChart') as ChartItem;
        
        myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map( band => band.name ),
                datasets: [{
                    label: '# de votos',
                    data: bands.map( band => band.votes ),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                indexAxis: 'y'
            }
        });

    }    

    return (
        <>
            <canvas id="myChart"></canvas>
        </>
    )
}

export default BanChart
