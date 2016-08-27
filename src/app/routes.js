import React from 'react';
import {Router, Route, hashHistory, browserHistory, IndexRoute } from 'react-router'

import AppLayout from './layout';
import IndexPage from './pages/index';
import TestPage from './pages/test';
import Test2Page from './pages/test2';

export default <Router history={hashHistory}>
    <Route path="/" component={AppLayout}>
        <IndexRoute component={IndexPage}/>
        <Route path="test" component={TestPage}/>
        <Route path="test2" component={Test2Page}/>
    </Route>
</Router>