import React, {useState} from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import {Button, Divider, FormControl, TextField} from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import {makeStyles} from '@material-ui/core/styles'
import * as yup from 'yup';
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
        width: '240px',
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

const ConfigNewModal = (props) => {
    const {setOpen, open, type, fetch} = props
    const classes = useStyles()
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const triggerOrChannel = type === 'channels' ? 'Canal' : 'Gatilho'
    const [disableButton, setDisableButton] = useState(false)

    const configSchema = yup.object().shape({
        name: yup
            .string()
            .min(3, "Tamanho mínimo de 3 letras!")
            .required('Preenchimento obrigatório!')
    })

    const [config, setConfig] = useState({
        name: ''
    })

    const handleClose = () => {
        setOpen(false)
        setErrors([])
        setConfig( {
            name: ''
        })
    }

    const handleConfig = (e) => {
        const value = e.target.value;
        setConfig({
            id: config.id,
            name: value
        })
    }

    const atualizaConfig = (e) => {
        e.preventDefault()
        setDisableButton(true)
        configSchema.validate(config, {abortEarly: false})
            .then(res => {
                api.post(`/${type}/`, config)
                    .then(res => {
                        if (res.status === 201) {
                            handleClose()
                            fetch()
                            dispatch(showSnackBar(true, triggerOrChannel + " adicionado com sucesso", "success"))
                        }
                        setDisableButton(false)
                    })
                    .catch(err => {
                        dispatch(showSnackBar(true, "Houve um erro na conexão com o servidor, tente novamente", "error"))
                        setDisableButton(false)
                    })
                setDisableButton(false)
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
                setDisableButton(false)
            })

    }

    const verifyError = (name) => {
        return errors.find(item => item.name == name)
    }

    const verifyHelperText = (name) => {
        if (errors.find(item => item.name == name)) {
            const index = errors.findIndex(item => item.name == name)
            return errors[index].message
        }
        return false
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
                <form className={classes.paper} onSubmit={atualizaConfig}>
                    <div className={classes.header}>
                        <HighlightOffIcon
                            onClick={handleClose}
                            className={classes.iconClose} />
                    </div>
                    <Divider />
                    <div className={classes.body}>
                        <div className={classes.inputFilter}>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    InputLabelProps={{shrink: true}}
                                    name={'name'}
                                    error={verifyError('name')}
                                    helperText={verifyHelperText('name')}
                                    value={config.name}
                                    onChange={handleConfig}
                                    label={triggerOrChannel} />
                            </FormControl>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.footer}>
                        <div className={classes.buttons}>
                            <Button variant='contained'
                                    onClick={handleClose}
                                    disabled={disableButton}
                                    color='secondary'>
                                Cancelar
                            </Button>
                            <Button variant='contained'
                                    type={'submit'}
                                    disabled={disableButton}
                                    color='primary'>
                                Criar Novo
                            </Button>
                        </div>
                    </div>
                </form>
            </Fade>
        </Modal>
    )
}

export default ConfigNewModal
