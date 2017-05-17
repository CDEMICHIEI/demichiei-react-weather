import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

// import { Router, Route, IndexRoute, browserHistory } from 'react-router';
// import App from './components/App';
// import Home from './routes/Home';
// import ContractOverview from './routes/ContractOverview';
// import ProjectOverview from './routes/ProjectOverview';
// import LaborCategory from './routes/LaborCategory';
// import Individual from './routes/Individual';
// import Alert from './routes/Alert';
// import Report from './routes/Report';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
