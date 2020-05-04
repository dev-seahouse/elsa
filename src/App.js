import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';
import { Theme } from 'react-switch-theme';
import Header from './UIComponents/Header/Header';
import TodoList from './Todo/TodoList';

const App = () => {
  const [theme, toogleTheme] = useContext(Theme);
  const headerClickedHandler = () => {
    toogleTheme();
  };
  return (
    <Router>
      <div className="container">
        <Header onClick={headerClickedHandler} />
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
