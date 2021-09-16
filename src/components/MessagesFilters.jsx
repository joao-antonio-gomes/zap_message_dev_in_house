import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, makeStyles, Select} from '@material-ui/core'
import {api} from '../services/api'

const useStyles = makeStyles({
    formControl: {
        width: '32%',
        minWidth: 120,
    },
    filter: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
    },
})

const MessagesFilters = (props) => {
    const {filter, handleChange, messages} = props
    const classes = useStyles()
    const [channels, setChannels] = useState([])
    const [triggers, setTriggers] = useState([])
    const [timer, setTimer] = useState([])

    useEffect(() => {
        api.get('/channels')
            .then(res => setChannels(res.data))

        api.get('/triggers')
            .then(res => setTriggers(res.data))

        api.get('/messages/?_sort=timer&_order=asc')
            .then(res => {
                const msg = res.data
                const horarios = msg.map(item => item.timer)
                const timerNaoRepetidos = [...new Set(horarios)]
                setTimer(timerNaoRepetidos)
            })
    }, [])

    useEffect(() => {
        api.get('/messages/?_sort=timer&_order=asc')
            .then(res => {
                const msg = res.data
                const horarios = msg.map(item => item.timer)
                const timerNaoRepetidos = [...new Set(horarios)]
                setTimer(timerNaoRepetidos)
            })
    }, [messages])

    return (
        <div className={classes.filter}>
            <FormControl className={classes.formControl}>
                <InputLabel>Gatilho</InputLabel>
                <Select
                    native
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
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor='age-native-simple'>Canal</InputLabel>
                <Select
                    native
                    value={filter.channel}
                    onChange={handleChange}
                    inputProps={{
                        name: 'channel',
                    }}
                >
                    <option aria-label='None'
                            value='' />
                    {
                        channels.map(item => (
                            <option value={item.name}
                                    key={item.id}>{item.name}</option>
                        ))
                    }
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/*<TextField id='standard-basic'
                           label='Timer'
                           type={'time'}
                           InputLabelProps={{shrink: true}}
                           name={'timer'}
                           onChange={handleChange}
                           value={filter.timer} />*/}
                <InputLabel htmlFor='age-native-simple'>Timer</InputLabel>
                <Select
                    native
                    value={filter.timer}
                    onChange={handleChange}
                    inputProps={{
                        name: 'timer',
                    }}>
                    <option aria-label='None'
                            value='' />
                    {
                        timer.map(item => (
                            <option value={item}
                                    key={item}>{item}</option>
                        ))
                    }
                </Select>
            </FormControl>
        </div>
    )
}

export default MessagesFilters
