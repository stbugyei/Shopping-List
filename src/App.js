import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import MainPage from './Components/MainPage';
import PurchasedItem from './Components/PurchasedItem';


function App() {
  return (

    <Router>
      <Switch>

        <Route exact path="/purchaseditem">
          <PurchasedItem />
        </Route>

        <Route exact path="/">
          <MainPage />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
