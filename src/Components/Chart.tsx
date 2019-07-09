import * as React from 'react';
import { Line } from 'react-chartjs-2';
import { ChartI } from './Interfaces/ChartInterface';
import '../Stylesheets/Chart.scss';

function Chart({data, labels}: ChartI) {

    let chartData = {
        labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'March', 'April'],
        datasets: [{
            label: labels.dataLabel,
            data: data,
            fill: false,
            borderColor: "rgb(23, 102, 130)",
            borderWidth: 2,
            pointBackgroundColor: "rgb(23, 102, 130)"
        }]
    }

    let chartOptions = {
        title: {
            display: true,
            text: labels.titleText,
            fontSize: 16,
            fontColor: 'black',
            fontFamily: 'Questrial',
            padding: 15
        },
        legend: {
            display: false
        }
    }

    return(
        <div id="team-section-chart">
            <Line data={chartData} options={chartOptions} width={600} height={250} />
        </div>
    );
}

export default Chart;