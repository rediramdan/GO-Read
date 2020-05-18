import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Provider } from "react-redux";

import './styles/index.css'

import BooksList from './pages/BooksList';
import Manage from './pages/Manage';
import RefreshToken from './pages/RefreshToken';
import BookDetail from './pages/BookDetail';
import BookEdit from './pages/BookEdit';
import BookAdd from './pages/BookAdd';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBooks from './pages/MyBooks';
import Dashboard from './pages/Dashboard';
import store from "./redux/store";


function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Route path='/' render={(props) => (<BooksList {...props}/>)} exact/>
        <Route path='/dashboard' render={(props) => (<Dashboard {...props}/>)} exact/>
        <Route path='/manage' render={(props) => (<Manage {...props}/>)} exact/>
        <Route path='/mybooks' render={(props) => (<MyBooks {...props}/>)} exact/>
        <Route path='/refresh-token' render={(props) => (<RefreshToken {...props}/>)} exact/>
        <Route path='/book/:bookId' exact render={(props) => (<BookDetail {...props}/>)} />
        <Route path='/book/edit/:bookId' render={(props) => (<BookEdit {...props}/>)} />
        <Route path='/add/book' exact render={(props) => (<BookAdd {...props}/>)} />
        <Route path='/login' render={(props) => (<Login {...props}/>)} />
        <Route path='/register' render={(props) => (<Register {...props}/>)} />
      </Router>
    </Provider>
    </>
  )
}

export default App;
