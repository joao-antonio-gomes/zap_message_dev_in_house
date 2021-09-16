const INITIAL_STATE = {
    open: false,
}

const menu = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_MENU_VIEW': {
            const {bool} = action.payload
            return {
                open: bool
            }
        }
        default:
            return state
    }
}

export {menu}
