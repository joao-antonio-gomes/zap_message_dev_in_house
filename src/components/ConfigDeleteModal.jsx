import React, {useEffect, useState} from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {
    Button,
    Divider,
    Typography,
} from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import {showSnackBar} from '../stores/modules/snackbar/actions'
import {useDispatch} from 'react-redux'
import {api} from '../services/api'

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        borderRadius: '6px',
        width: '50vw',
        height: 'auto',
        [theme.breakpoints.down(1300)]: {
            width: '60vw',
        },
        [theme.breakpoints.down(800)]: {
            width: '80vw',
        },
    },
    header: {
        display: 'flex',
        padding: theme.spacing(0.5),
        justifyContent: 'flex-end',
    },
    iconClose: {
        color: '#767676',
        cursor: 'pointer',
    },
    body: {
        marginBottom: '10px',
        padding: '10px',
    },
    textArea: {
        width: '100%',
        marginTop: '10px',
    },
    footer: {
        display: 'flex',
        padding: theme.spacing(0.5),
        justifyContent: 'flex-end',
    },
    buttons: {
        padding: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'space-between',
        width: '220px',
    },
    formControl: {
        width: '32%',
        minWidth: 120,
    },
    inputFilter: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
    },
}))

const ConfigDeleteModal = (props) => {
    const {open, handleClose, item, type, fetch} = props
    const classes = useStyles()
    const dispatch = useDispatch()
    const triggerOrChannel = type === 'channels' ? 'Canal' : 'Gatilho'


    const excluiConfig = () => {
        api.delete(`/${type}/${item.id}`)
            .then(res => {
                if (res.status === 200) {
                    handleClose()
                    fetch()
                    dispatch(showSnackBar(true, triggerOrChannel+ ' excluído com sucesso', 'success'))
                }
            })
            .catch(err => {
                console.log({err})
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente', 'error'))
            })
    }

    return (
        <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            className={classes.modal}
            open={open}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    <div className={classes.header}>
                        <HighlightOffIcon
                            onClick={handleClose}
                            className={classes.iconClose} />
                    </div>
                    <Divider />
                    <div className={classes.body}>
                        <div className={classes.inputFilter}>
                            <div>
                                <Typography variant={'h6'}>{type === 'channels' ? 'Canal' : 'Gatilho'}:</Typography>
                                <Typography variant={'body2'}>{item.name}</Typography>
                            </div>
                            <div>
                                <Typography variant={'h6'}>ID:</Typography>
                                <Typography variant={'body2'}>{item.id}</Typography>
                            </div>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.footer}>
                        <div className={classes.buttons}>
                            <Button variant='contained'
                                    onClick={handleClose}
                                    color='secondary'>
                                Cancelar
                            </Button>
                            <Button variant='contained'
                                    onClick={excluiConfig}
                                    color='primary'>
                                Excluir
                            </Button>
                        </div>
                    </div>
                </div>
            </Fade>
        </Modal>
    )
}

export default ConfigDeleteModal
