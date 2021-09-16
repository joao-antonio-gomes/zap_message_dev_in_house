import React from 'react'
import {Bar} from 'react-chartjs-2'

const data = {
    labels: ['Zapelino', 'Oi', 'BRB', 'BRB Nação'],
    datasets: [
        {
            label: '# de contas abertas',
            data: [12, 19, 3, 5],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

const options = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 2,
        },
    },
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                boxWidth: 150,
                boxHeight: 30,
                font: {
                    size: 18,
                },
            },
        },
    },
}

const HorizontalBarChart = () => (
    <>
        <Bar data={data}
             options={options} />
    </>
)

export default HorizontalBarChart
