import React from 'react';
import ReactDOM from 'react-dom';

import routes from './app/routes';

ReactDOM.render(routes, document.getElementById('app-root'));


// test

import SO from './lib/simple-observable';

window.SO = SO;