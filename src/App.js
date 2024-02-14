import React from 'react';
import './App.css';
import Layout from './Components/layout/Layout';
import {Switch} from 'react-router-dom';
import {Login} from './Components/auth/login/Login';
import { AuthenticatedRoute } from './core/guards/AuthenticatedRoute';
import { NonAuthenticatedRoute } from './core/guards/NonAuthenticatedRoute';
import { Register } from './Components/auth/register/Register';
function App() {
  return (
    <div className="App">
      <Switch>
        <NonAuthenticatedRoute exact path="/login" component={Login}/>
        <NonAuthenticatedRoute path="/register" component={Register}/>
        <AuthenticatedRoute path="/" component={Layout}/>
      </Switch>
    </div>
  );
}

export default App;
