import React from 'react';
import {Router, Route, hashHistory, browserHistory, IndexRoute} from 'react-router'

import AppLayout from './layout';
import IndexPage from './pages/index';
import TodosPage from './pages/todos';

export default <Router history={hashHistory}>
    <Route path="/" component={AppLayout}>
        <IndexRoute component={IndexPage}/>
        <Route path="/todos" component={TodosPage}/>
    </Route>
</Router>