import React from 'react'
import {AppBar, makeStyles, Toolbar, Typography} from '@material-ui/core'
import Menu from './Menu'
import MenuIcon from '@material-ui/icons/Menu'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import {useDispatch, useSelector} from 'react-redux'
import {updateMenuView} from '../stores/modules/menu/actions'

const useStyles = makeStyles({
    buttonMenu: {
        cursor: 'pointer',
    },
    containerNav: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    logoInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '240px'
    },
    logo: {
        fontSize: '30px'
    }
})

const Navbar = () => {
    const classes = useStyles()
    const open = useSelector(state => state.menu.open)
    const dispatch = useDispatch()

    return (
        <>
            <AppBar position='static'>
                <Toolbar className={classes.containerNav}>
                    <MenuIcon edge='start'
                              className={classes.buttonMenu}
                              onClick={() => dispatch(updateMenuView(true))}
                              color='inherit'
                              aria-label='menu'>
                    </MenuIcon>
                    <div className={classes.logoInfo}>
                        <WhatsAppIcon className={classes.logo} />
                        <Typography variant='h6'>
                            Zap Message System
                        </Typography>
                    </div>
                    <div/>
                </Toolbar>
            </AppBar>
            <Menu open={open}/>
        </>
    )
}

export default Navbar
