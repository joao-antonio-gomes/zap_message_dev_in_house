import {combineReducers} from 'redux'
import {menu} from './menu/reducers'
import {snackbar} from './snackbar/reducers'
import {configs} from './configs/reducers'

export default combineReducers({
    menu,
    snackbar,
    configs
})
