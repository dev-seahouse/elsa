import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import Header from './UIComponents/Header/Header';
import SearchBar from "./UIComponents/Widgets/SearchBar";

const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <SearchBar/>
          <Switch>
            <Route path="/" exact></Route>
            <Redirect to="/" />
          </Switch>
        </main>

      </div>

    </Router>
  );
};

export default App;
