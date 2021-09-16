import React, {useEffect, useState} from 'react'
import {Line} from 'react-chartjs-2'
import {api} from '../services/api'

const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
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

const LineChart = () => {
    const [linhas, setLinhas] = useState([])
    const [transacoes, setTransacoes] = useState([])

    useEffect(()=>{
        api.get('/transacoes_pix')
            .then(res => {
                setLinhas(res.data.map(item =>
                item.date))
                setTransacoes(res.data.map(item =>
                item.amount))
            })
    }, [])

    const data = {
        labels: linhas,
        datasets: [
            {
                label: '# de Transações PIX',
                data: transacoes,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    }

    return (
        <>
            <Line data={data}
                  options={options} />
        </>
    )
}

export default LineChart
