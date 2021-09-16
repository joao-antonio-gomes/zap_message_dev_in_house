import React from 'react'
import {ListItem, ListItemIcon, ListItemText, makeStyles} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {updateMenuView} from '../stores/modules/menu/actions'

const useStyles = makeStyles({
    listItem: {
        height: '64px',
    },
})

const MenuItem = (props) => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const history = useHistory()

    const handleLink = () => {
        history.push(props.slug)
        dispatch(updateMenuView(false))
    }

    return (
        <>
            <ListItem className={classes.listItem}
                      onClick={handleLink}
                      button>
                <ListItemIcon>
                    {props.children}
                </ListItemIcon>
                <ListItemText primary={props.menuText} />
            </ListItem>
        </>
    )
}

export default MenuItem
