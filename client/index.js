import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import reducer from './reducers';
import App from './components/App';
import MainPage from './components/MainPage';
import About from './components/About';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import './assets/style.less';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={MainPage} />
                <Route path="/about" component={About} />
                <Route path="/register" component={RegisterForm} />
                <Route path="/login" component={LoginForm} />
            </Route>           
        </Router>
    </Provider>, 
    document.getElementById('app')
);