import React, {useState} from 'react'
import {Snackbar} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import {useDispatch, useSelector} from 'react-redux'
import {showSnackBar} from '../stores/modules/snackbar/actions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = (props) => {
    const dispatch = useDispatch()
    const {open, text, severity} = useSelector(state => state.snackbar)
    const handleClose = () => {
        dispatch(showSnackBar(false, '', ''))
    }

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {text}
            </Alert>
        </Snackbar>
    )
}

export default CustomSnackbar
