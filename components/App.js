import React, {Component, PropTypes} from 'react';
import { Router, Route, Link,IndexRoute,browserHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Store from './Store';
import CreateProduct from './CreateProduct';
import Index from './Index';
window.addEventListener("load", function(){
ReactDOM.render((
  <Router  history={browserHistory}>
      <Route name="app" path="/" component={Index}>
          <IndexRoute component={Store} />
          <Route name="store" path="store" component={Store} />
          <Route name="createProduct" path="createProduct" component={CreateProduct} />
      </Route>
  </Router>
  ),document.getElementById('content'));

});