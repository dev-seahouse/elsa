import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import Header from './UIComponents/Header/Header';
import TodoList from './Todo/TodoList';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact>
              <TodoList></TodoList>
            </Route>
            <Redirect to="/" />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
