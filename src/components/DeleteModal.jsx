import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {Button, Typography} from '@material-ui/core'
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
        borderRadius: '6px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    footer: {
        display: 'flex',
        padding: theme.spacing(0.5),
        justifyContent: 'flex-end',
    },
    buttons: {
        paddingTop: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'space-between',
        width: '220px',
    },
}))

const MessagesModal = (props) => {
    const {message, handleClose, open, finishMessageRegister} = props
    const classes = useStyles()
    const dispatch = useDispatch()

    const deleteMessage = () => {
        api.delete(`/messages/${message.id}`)
            .then(res => {
                if (res.status === 200) {
                    handleClose()
                    finishMessageRegister()
                    dispatch(showSnackBar(true, "Mensagem deletada com sucesso", "success"))
                }
            })
            .catch(err => {
                dispatch(showSnackBar(true, "Houve um erro na conexão com o servidor, tente novamente", "error"))
            })
    }

    return (
        <div>
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
                        <Typography variant={'h6'}>Você tem certeza que deseja deletar essa mensagem?</Typography>
                        <br/>
                        <Typography variant={'body1'}>Mensagem:</Typography>
                        <Typography variant={'body2'}>{message.mensagem}</Typography>
                        <br/>
                        <Typography variant={'body1'}>Canal:</Typography>
                        <Typography variant={'body2'}>{message.channel}</Typography>
                        <br/>
                        <Typography variant={'body1'}>Timer:</Typography>
                        <Typography variant={'body2'}>{message.timer}</Typography>
                        <br/>
                        <Typography variant={'body1'}>Criada em:</Typography>
                        <Typography variant={'body2'}>{message.created_at}</Typography>
                        <div className={classes.footer}>
                            <div className={classes.buttons}>
                                <Button variant='contained'
                                        onClick={handleClose}
                                        color='secondary'>
                                    Cancelar
                                </Button>
                                <Button variant='contained'
                                        onClick={deleteMessage}
                                        color='primary'>
                                    Deletar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}

export default MessagesModal
