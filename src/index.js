import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Routes from './routes';
import getStore from './reducers';
import { Provider } from 'react-redux';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
const store = getStore(preloadedState);

class AppRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    );
  }
}

ReactDOM.render(<AppRouter/>, document.getElementById('main'));

export default Routes;