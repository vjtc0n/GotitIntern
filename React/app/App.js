// Import react
import React,{Component} from 'react';
import {render} from 'react-dom';

// Import components
import Root from './redux/Root';

// Import sass
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss'
import './stylesheets/style.scss';
import './stylesheets/transitions.scss'

import './stylesheets/css/style.css'
import './stylesheets/css/sweetalert.css'
import './stylesheets/css/swipebox.min.css'
import './stylesheets/css/animsition.css'
import './stylesheets/css/material.indigo-pink.min.css'

render(<Root/>, document.getElementById('root'))