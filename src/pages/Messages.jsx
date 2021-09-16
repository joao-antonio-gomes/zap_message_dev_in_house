import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core'
import MessagesTable from '../components/MessagesTable'
import MessagesFilters from '../components/MessagesFilters'
import MessagesHeader from '../components/MessagesHeader'
import NewMessageModal from '../components/NewMessageModal'
import {api} from '../services/api'
import {useDispatch} from 'react-redux'
import {showSnackBar} from '../stores/modules/snackbar/actions'

const useStyles = makeStyles({
    container: {
        width: '80vw',
        paddingTop: '2vw',
        left: 0,
        right: 0,
        margin: 'auto',
    },
    filter: {
        marginTop: '2vw',
    },
})

const Messages = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [messages, setMessages] = useState([])
    const [filter, setFilter] = useState({
        channel: '',
        trigger: '',
        timer: '',
    })

    useEffect(() => {
        api.get('/messages/?_sort=created_at&_order=desc')
            .then(res => setMessages(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))
    }, [])

    const searchMessagesByFilter = () => {
        api.get(`/messages?channel_like=${filter.channel}&trigger_like=${filter.trigger}&timer_like=${filter.timer}`)
            .then(res => setMessages(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))
    }

    const handleChange = (event) => {
        const name = event.target.name
        setFilter({
            ...filter,
            [name]: event.target.value,
        })
    }

    const finishMessageRegister = () => {
        api.get('/messages/?_sort=created_at&_order=desc')
            .then(res => setMessages(res.data))
            .catch((e) =>
                dispatch(showSnackBar(true, 'Houve um erro na conexão com o servidor, tente novamente: ' + e, 'error')))
    }

    /*** MODAL ***/
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div className={classes.container}>
            <MessagesHeader setOpen={setOpen}
                            searchMessagesByFilter={searchMessagesByFilter} />
            <div className={classes.filter}>
                <MessagesFilters handleChange={handleChange}
                                 messages={messages}
                                 filter={filter} />
            </div>
            <MessagesTable messages={messages}
                           finishMessageRegister={finishMessageRegister} />
            <NewMessageModal open={open}
                             finishMessageRegister={finishMessageRegister}
                             handleClose={handleClose} />
        </div>
    )
}

export default Messages
