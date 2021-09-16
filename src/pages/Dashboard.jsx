import React from 'react'
import ChartBar from '../components/HorizontalBar'
import LineChart from '../components/LineChart'
import {Divider, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles( theme => ({
    container: {
        width: '95vw',
        paddingTop: '2vw',
        left: 0,
        right: 0,
        margin: 'auto'
    },
    titulo: {
        textAlign: 'center',
    },
    divider: {
        marginTop: '30px',
        marginBottom: '30px'
    },
    charts: {
        marginTop: '5vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up(1600)]: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        },
    },
    horizontalChart: {
        width: '100%',
        marginBottom: '5vw',
        [theme.breakpoints.up(800)]: {
            width: '80%',
        },
        [theme.breakpoints.up(1600)]: {
            width: '50%',
        },
    },
    lineChart: {
        width: '80%',
        [theme.breakpoints.up(800)]: {
            width: '80%',
        },
        [theme.breakpoints.up(1600)]: {
            width: '50%',
        },
    }
}))

const Dashboard = () => {
    const classes = useStyles()
    return (
        <div className={classes.container}>
            <div className={classes.titulo}>
                <Typography variant={'h5'}>Contas Abertas - BOT</Typography>
            </div>
            <div className={classes.charts}>
                <div className={classes.horizontalChart}>
                    <ChartBar />
                </div>
                <div className={classes.lineChart}>
                    <LineChart />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
