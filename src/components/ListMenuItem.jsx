import React from 'react'
import {List, makeStyles} from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart'
import MenuItem from './MenuItem'
import MessageIcon from '@material-ui/icons/Message'
import SettingsIcon from '@material-ui/icons/Settings';
const useStyles = makeStyles({
    list: {
        paddingTop: 0,
    },
})

const ListMenuItem = () => {
    const classes = useStyles()
    return (
        <List component='nav'
              className={classes.list}>
            <MenuItem slug={'/dashboard'} menuText={'Dashboard'}>
                <BarChartIcon />
            </MenuItem>
            <MenuItem slug={'/messages'} menuText={'Mensagens'}>
                <MessageIcon />
            </MenuItem>
            <MenuItem slug={'/settings'} menuText={'Configurações'}>
                <SettingsIcon />
            </MenuItem>
        </List>
    )
}

export default ListMenuItem
