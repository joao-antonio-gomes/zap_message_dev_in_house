import React from 'react'
import {Button, makeStyles, Typography} from '@material-ui/core'

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        width: '300px',
        justifyContent: 'space-between',
    },
})

const MessagesHeader = (props) => {
    const {searchMessagesByFilter, setOpen} = props
    const classes = useStyles()

    return (
        <div className={classes.header}>
            <Typography variant={'h4'}>
                Mensagens
            </Typography>
            <div className={classes.buttons}>
                <Button variant='contained'
                        onClick={searchMessagesByFilter}
                        color='primary'>
                    Pesquisar
                </Button>
                <Button variant='contained'
                        onClick={() => setOpen(true)}
                        color='secondary'>
                    Nova Mensagem
                </Button>
            </div>
        </div>
    )
}

export default MessagesHeader
