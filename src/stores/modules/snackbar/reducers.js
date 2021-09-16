const INITIAL_STATE = {
    open: false,
    text: '',
    severity: ''
}

const snackbar = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SHOW_SNACKBAR': {
            const {bool} = action.payload
            const {text} = action.payload
            const {severity} = action.payload
            return {
                open: bool,
                text: text,
                severity: severity
            }
        }
        default:
            return state
    }
}

export {snackbar}
