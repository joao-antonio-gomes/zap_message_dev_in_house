import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    bodyerror: {
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    },
    img: {
        height: 'auto',
        width: '40%',
        [theme.breakpoints.down(1300)]: {
            width: '60%',
        },
        [theme.breakpoints.down(600)]: {
            width: '80%',
        }
    }
}))

const NotFound = () => {
    const classes = useStyles()
    return (
        <div className={classes.bodyerror}>
            <img className={classes.img} src='https://i1.wp.com/www.grupoprimos.com/wp-content/uploads/2016/05/4.gif?resize=629%2C375'
                 alt='Página não encontrada' />
        </div>
    )
}

export default NotFound
