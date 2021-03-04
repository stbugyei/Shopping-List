import React from 'react';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocalStorage from "./Components/useLocalStorage"
import EditItem from './Components/EditItem';
import MainPage from './Components/MainPage';
import PurchasedItem from './Components/PurchasedItem';
import './App.css';


function App() {

  const [storedProduct, setStoredProduct] = useLocalStorage("products", []);
  const [notification, setNotification] = useState("");

  //====== Adding items to localStorage  ====== 
  const addToStorage = (items) => {
    if (!storedProduct.some(fav => fav.id === items.id)) {
      setStoredProduct([...storedProduct, items]);
    }
  }


  //====== Deleting items from localStorage  ======
  const handleClickDelete = (items) => {
    const newList = storedProduct.filter((item) => item.id !== items.id)
    setStoredProduct(newList);
    setNotification(`${items.item} Removed !`);
  }


  //==========Function to editItem =======
  const updateItem = (filteredItem, id) => {
    setStoredProduct(storedProduct.map((item) => (item.id === id ? filteredItem : item)))
  }


  return (

    <Router>
      <Switch>

        <Route exact path="/purchaseditem">
          <PurchasedItem />
        </Route>

        <Route exact path="/item/edit/:id/:item">
          <EditItem updateItem={updateItem} storedProduct={storedProduct} />
        </Route>

        <Route exact path="/">
          <MainPage addToStorage={addToStorage} handleClickDelete={handleClickDelete} updateItem={updateItem} notification={notification} setNotification={setNotification} storedProduct={storedProduct} />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
