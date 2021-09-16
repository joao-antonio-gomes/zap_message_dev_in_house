import React from 'react'
import {Drawer, makeStyles, Paper} from '@material-ui/core'
import ListMenuItem from './ListMenuItem'
import {useDispatch, useSelector} from 'react-redux'
import {updateMenuView} from '../stores/modules/menu/actions'

const useStyles = makeStyles({
    list: {
        width: 'auto',
        height: '100vh'
    }
})

const Menu = (props) => {
    const open = useSelector(state => state.menu.open)
    const dispatch = useDispatch()
    const classes = useStyles()
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        dispatch(updateMenuView(open));
    };
    return (
        <Drawer anchor={'left'} open={open} onClose={toggleDrawer(false)}>
            <Paper className={classes.list}>
                <ListMenuItem />
            </Paper>
        </Drawer>
    )
}

export default Menu
