import 'material-design-lite/material.css!';
import '../../public/css/custom-material.min.css!';                       
import 'material-design-lite/material';
import './style/style.css!';
import 'animateCss/animate.css!';

import React                    from 'react';
import ReactDOM                 from 'react-dom';
import injectTapEventPlugin     from 'react-tap-event-plugin';            // Material UI needed until v1.0.x is released
import {Routes}                 from './components/Routes/Routes.jsx!jsx';   
 
injectTapEventPlugin(); // needed for Material-UI click and tap event...
 
ReactDOM.render(<Routes />, document.getElementById('root'));
