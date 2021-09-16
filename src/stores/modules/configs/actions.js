const changeConfig = (type) => {
    return {
        type: 'CHANGE_CONFIG',
        payload: {
            type
        }
    }
}

export {changeConfig}
