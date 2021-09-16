const updateMenuView = (bool) => {
    return {
        type: 'UPDATE_MENU_VIEW',
        payload: {
            bool
        }
    }
}

export {updateMenuView}
