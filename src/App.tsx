import React from 'react';
import { Provider } from 'react-redux';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import store from './store/';

import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';
import { PrivateRoute } from './PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Switch>
            <Route exact component={Login} path='/login' />
            <PrivateRoute component={Dashboard} path='/' />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
