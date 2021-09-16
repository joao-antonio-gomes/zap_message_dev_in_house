const showSnackBar = (bool, text, severity) => {
    return {
        type: 'SHOW_SNACKBAR',
        payload: {
            bool, text, severity
        }
    }
}

export {showSnackBar}
