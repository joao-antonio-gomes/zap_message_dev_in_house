import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {Button, Divider, FormControl, FormHelperText, InputLabel, Select, TextField} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import * as yup from 'yup'
import {useDispatch} from 'react-redux'
import {showSnackBar} from '../stores/modules/snackbar/actions'
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
        justifyContent: 'space-between',
    },
}))


const EditModal = (props) => {
    const {handleClose, open, finishMessageRegister, message} = props
    const classes = useStyles()
    const [filter, setFilter] = useState({
        channel: message.channel,
        trigger: message.trigger,
        timer: message.timer,
        message: message.message,
        created_at: message.created_at
    })
    const [errors, setErrors] = useState([])
    const [channels, setChannels] = useState([])
    const [triggers, setTriggers] = useState([])
    const dispatch = useDispatch()

    const messageSchema = yup.object().shape({
        channel: yup
            .string()
            .oneOf(channels.map(item => item.name), 'Favor selecionar uma opção válida!')
            .required('Favor selecionar uma opção!'),
        trigger: yup
            .string()
            .oneOf(triggers.map(item => item.name), 'Favor selecionar uma opção válida!')
            .required('Favor selecionar uma opção!'),
        timer: yup
            .string()
            .required('Preenchimento obrigatório!'),
        message: yup
            .string()
            .required('Preenchimento obrigatório!'),
    })

    useEffect(() => {
        api.get('/channels')
            .then(res => setChannels(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))

        api.get('/triggers')
            .then(res => setTriggers(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))
    }, [])

    const handleChange = (event) => {
        const name = event.target.name
        setFilter({
            ...filter,
            [name]: event.target.value,
        })
    }

    const cancelaMensagem = () => {
        handleClose()
        setErrors([])
        setFilter({
            channel: '',
            trigger: '',
            timer: '',
            message: ''
        })
    }

    const formataData = (date) => {
        return [date.getDate(),
                date.getMonth() + 1,
                date.getFullYear()].join('/') + ' ' +
            [date.getHours(),
                date.getMinutes(),
                date.getSeconds()].join(':')
    }

    const atualizarMensagem = async (e) => {
        e.preventDefault()
        setFilter({...filter, atualizado_em: formataData(new Date)})
        messageSchema.validate(filter, {abortEarly: false})
            .then(res => {
                api.put(`/messages/${message.id}`, filter)
                    .then(res => {
                        if (res.status === 200) {
                            cancelaMensagem()
                            finishMessageRegister()
                            dispatch(showSnackBar(true, "Mensagem atualizada com sucesso", "success"))
                        }
                    })
                    .catch(err => {
                        dispatch(showSnackBar(true, "Houve um erro na conexão com o servidor, tente novamente", "error"))
                    })
            })
            .catch(err => {
                err = JSON.stringify(err)
                err = JSON.parse(err)
                err = err.inner
                const erros = err.map(erro => {
                    return {
                        name: erro.path,
                        message: erro.message,
                    }
                })
                setErrors(erros)
            })
    }

    const verifyError = (name) => {
        return !!errors.find(item => item.name == name)
    }

    const verifyHelperText = (name) => {
        if (errors.find(item => item.name == name)) {
            const index = errors.findIndex(item => item.name == name)
            return errors[index].message
        }
        return false
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
                    <form className={classes.paper} onSubmit={atualizarMensagem}>
                        <div className={classes.header}>
                            <HighlightOffIcon className={classes.iconClose}
                                              onClick={cancelaMensagem} />
                        </div>
                        <Divider />
                        <div className={classes.body}>
                            <div className={classes.inputFilter}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel>Gatilho</InputLabel>
                                    <Select
                                        native
                                        error={verifyError('trigger')}
                                        value={filter.trigger || ''}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'trigger',
                                        }}
                                    >
                                        <option aria-label='None'
                                                value=' '> </option>
                                        {
                                            triggers.map(item => (
                                                <option value={item.name}
                                                        key={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </Select>
                                    {verifyError('trigger') &&
                                    <FormHelperText error={true}>{verifyHelperText('trigger')}</FormHelperText>}
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <InputLabel htmlFor='age-native-simple'>Canal</InputLabel>
                                    <Select
                                        native
                                        error={verifyError('channel')}
                                        value={filter.channel || ''}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'channel',
                                        }}>
                                        <option aria-label='None'
                                                value=' ' />
                                        {
                                            channels.map(item => (
                                                <option value={item.name}
                                                        key={item.id}>{item.name}</option>
                                            ))
                                        }
                                    </Select>
                                    {verifyError('channel') &&
                                    <FormHelperText error={true}>{verifyHelperText('channel')}</FormHelperText>}
                                </FormControl>
                                <FormControl className={classes.formControl}>
                                    <TextField id='standard-basic'
                                               label='Timer'
                                               type={'time'}
                                               error={verifyError('timer')}
                                               helperText={verifyHelperText('timer')}
                                               name={'timer'}
                                               onChange={handleChange}
                                               value={filter.timer || ''} />
                                </FormControl>
                            </div>
                            <TextField multiline
                                       value={filter.message || ''}
                                       onChange={handleChange}
                                       name={'message'}
                                       error={verifyError('message')}
                                       helperText={verifyHelperText('message')}
                                       className={classes.textArea}
                                       label={'Digite aqui sua mensagem'}
                                       rows={4} />
                        </div>
                        <Divider />
                        <div className={classes.footer}>
                            <div className={classes.buttons}>
                                <Button variant='contained'
                                        onClick={cancelaMensagem}
                                        color='secondary'>
                                    Cancelar
                                </Button>
                                <Button variant='contained'
                                        type={'submit'}
                                        color='primary'>
                                    Atualizar
                                </Button>
                            </div>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    )
}

export default EditModal
