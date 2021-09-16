import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Messages from '../pages/Messages'
import NotFound from '../pages/NotFound'
import Configs from '../pages/Configs'

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Redirect to="/dashboard" />
            </Route>
            <Route exact
                   path={'/dashboard'}>
                <Dashboard />
            </Route>
            <Route exact
                   path={'/messages'}>
                <Messages />
            </Route>
            <Route exact
                   path={'/settings'}>
                <Configs />
            </Route>
            <Route component={NotFound} />
        </Switch>
    )
}

export default Routes
