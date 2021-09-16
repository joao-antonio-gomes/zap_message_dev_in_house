const INITIAL_STATE = {
    type: ' ',
}

const configs = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CHANGE_CONFIG': {
            const {type} = action.payload
            return {
                type: type
            }
        }
        default:
            return state
    }
}

export {configs}
