import React, {useEffect, useState} from 'react'
import {Button, FormControl, InputLabel, makeStyles, Select, Typography} from '@material-ui/core'
import ConfigTable from '../components/ConfigTable'
import ConfigNewModal from '../components/ConfigNewModal'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {changeConfig} from '../stores/modules/configs/actions'
import {api} from '../services/api'
import {showSnackBar} from '../stores/modules/snackbar/actions'

const useStyles = makeStyles({
    container: {
        width: '80vw',
        paddingTop: '2vw',
        left: 0,
        right: 0,
        margin: 'auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    buttons: {
        display: 'flex',
        width: '300px',
        justifyContent: 'space-between',
    },
    formControl: {
        width: '32%',
        minWidth: 120,
    },
    filter: {
        marginTop: '2vw',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const Configs = () => {
    const dispatch = useDispatch()
    const property = useSelector(state => state.configs.type)
    const classes = useStyles()
    const [channels, setChannels] = useState([])
    const [triggers, setTriggers] = useState([])


    /*** MODAL ***/
    const [open, setOpen] = useState(false)


    useEffect(() => {
        getChannelsAndTriggers();
    }, [])


    const getChannelsAndTriggers = () => {
        api.get('/channels')
            .then(res => setChannels(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))

        api.get('/triggers')
            .then(res => setTriggers(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))
    }

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Typography variant={'h4'}>
                    Configurações
                </Typography>
                <div className={classes.buttons}>
                    {property === ' ' ? '' :
                        <Button variant='contained'
                                onClick={() => setOpen(true)}
                                color='primary'>
                            Novo {property === 'channels' ? 'Canal' : 'Gatilho'}
                        </Button>}
                </div>
            </div>
            <div className={classes.filter}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Configurações</InputLabel>
                    <Select
                        native
                        value={property}
                        onChange={(e) => dispatch(changeConfig(e.target.value))}
                        name={'property'}>
                        <option aria-label='None'
                                value=' '>Selecione um valor para editar
                        </option>
                        <option aria-label='None'
                                value='channels'>Canal
                        </option>
                        <option aria-label='None'
                                value='triggers'>Gatilhos
                        </option>
                    </Select>
                </FormControl>
            </div>
            {property === 'channels' && <ConfigTable fetch={getChannelsAndTriggers}
                                                     config={channels}
                                                     type={'channels'} />}
            {property === 'triggers' && <ConfigTable fetch={getChannelsAndTriggers}
                                                     config={triggers}
                                                     type={'triggers'} />}
            <ConfigNewModal open={open}
                            setOpen={setOpen}
                            type={property}
                            fetch={getChannelsAndTriggers} />
        </div>
    )
}

export default Configs
