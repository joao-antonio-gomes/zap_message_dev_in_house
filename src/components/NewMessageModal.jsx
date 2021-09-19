import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import {Button, Divider, FormControl, FormHelperText, InputLabel, Select, TextField} from '@material-ui/core'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import * as yup from 'yup'
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
        paddingTop: theme.spacing(0.5),
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
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

const messageSchema = yup.object().shape({
    channel: yup
        .string()
        .required('Favor selecionar uma opção!'),
    trigger: yup
        .string()
        .required('Favor selecionar uma opção!'),
    timer: yup
        .string()
        .required('Preenchimento obrigatório!'),
    message: yup
        .string()
        .required('Preenchimento obrigatório!'),
})

const NewMessageModal = (props) => {
    const {handleClose, open, finishMessageRegister, message} = props
    const classes = useStyles()
    const [filter, setFilter] = useState({
        channel: '',
        trigger: '',
        timer: '',
    })
    const [textArea, setTextArea] = useState('')
    const [errors, setErrors] = useState([])
    const [channels, setChannels] = useState([])
    const [triggers, setTriggers] = useState([])
    const [buttonDisable, setButtonDisable] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        api.get('/channels')
            .then(res => setChannels(res.data))

        api.get('/triggers')
            .then(res => setTriggers(res.data))
    }, [])

    let messageToSave = {}

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
        })
        setTextArea('')
    }

    const formataData = (date) => {
        return [date.getDate(),
                date.getMonth() + 1,
                date.getFullYear()].join('/') + ' ' +
            [date.getHours(),
                date.getMinutes(),
                date.getSeconds()].join(':')
    }

    const salvarMensagem = async (e) => {
        e.preventDefault()
        messageToSave = {
            ...filter,
            message: textArea,
            created_at: formataData(new Date),
        }
        setButtonDisable(true)

        messageSchema.validate(messageToSave, {abortEarly: false})
            .then(res => {
                postMensagem()
            })
            .catch(err => {
                //captura erro do YUP validator
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
                setButtonDisable(false)
            })


    }

    const postMensagem = () => {
        api.post('/messages/', messageToSave)
            .then(res => {
                if (res.status === 201) {
                    cancelaMensagem()
                    finishMessageRegister()
                    dispatch(showSnackBar(true, 'Mensagem criada com sucesso', 'success'))
                }
                setButtonDisable(false)

            })
            .catch(err => {
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente', 'error'))
                setButtonDisable(false)
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
                    <form className={classes.paper}
                          onSubmit={salvarMensagem}>
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
                                        value={filter.trigger}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'trigger',
                                        }}
                                    >
                                        <option aria-label='None'
                                                value='' />
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
                                        value={filter.channel}
                                        onChange={handleChange}
                                        inputProps={{
                                            name: 'channel',
                                        }}>
                                        <option aria-label='None'
                                                value='' />
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
                                               InputLabelProps={{shrink: true}}
                                               type={'time'}
                                               error={verifyError('timer')}
                                               helperText={verifyHelperText('timer')}
                                               name={'timer'}
                                               onChange={handleChange}
                                               value={filter.timer} />
                                </FormControl>
                            </div>
                            <TextField multiline
                                       value={textArea}
                                       onChange={(e) => {
                                           setTextArea(e.target.value)
                                       }}
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
                                        disabled={buttonDisable}
                                        onClick={cancelaMensagem}
                                        color='secondary'>
                                    Cancelar
                                </Button>
                                <Button variant='contained'
                                        disabled={buttonDisable}
                                        type={'submit'}
                                        color='primary'>
                                    Salvar
                                </Button>
                            </div>
                        </div>
                    </form>
                </Fade>
            </Modal>
        </div>
    )
}

export default NewMessageModal
