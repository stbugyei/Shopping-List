import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import useLocalStorage from "./Components/useLocalStorage"
import EditItem from './Components/EditItem';
import MainPage from './Components/MainPage';
import PurchasedItem from './Components/PurchasedItem';
import './App.css';
import ScrollToTop from './Components/ScrollToTop';


function App() {

  const [storedProduct, setStoredProduct] = useLocalStorage("products", []);
  const [retrievePurchasedItem, setretRievePurchasedItem] = useState('');
  const [checkedAll, setCheckedAll] = useLocalStorage("checkedAll", false);
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
    setNotification(`${items.item} Removed!`);
  }

  //====== Deleting all selected items from localStorage  ======
  const handleClickDeleteAll = () => {
    let selectedItem = [];
    let notList = []
    storedProduct.forEach(itm => {
      if (itm.check) {
        selectedItem.push(itm)
      }
    });
    const newList = storedProduct.filter(item1 => !selectedItem.some(item2 => item1.id === item2.id));
    const notificationList = storedProduct.filter(item1 => selectedItem.some(item2 => item1.id === item2.id));
    setStoredProduct(newList);
    notificationList.forEach(element => {
      notList.push(element.item)
      setNotification(`${(notList).join(", ")} Removed!`)
    });
  }


  //==========Function to editItem =======
  const updateItem = (filteredItem, id) => {
    setStoredProduct(storedProduct.map((item) => (item.id === id ? filteredItem : item)))
  }

  //========== Function to toggle checkbox state =======
  const checkCompleted = (e, id) => {
    let checked = e.target.checked
    setStoredProduct(storedProduct.map(item => { if (item.id === id) { item.check = checked } return item }))
  }

  //==== Function to toggle checkbox state for all item ====
  const checkCompletedAll = (value) => {
    setCheckedAll(value);
    setStoredProduct(storedProduct.map(item => { item.check = value; return item }))
  }

  //==== Condition to toggle the check all checkbox to true/false ====

  useEffect(() => {
    let allchecked = true;
    let allPurchased = storedProduct.some(ticked => ticked.check === false)

    if (allPurchased) { allchecked = false }

    if (allchecked) {
      const reset = setInterval(() => (setCheckedAll(true)), 100)
      return () => { clearInterval(reset); }

    } else {
      const reset1 = setInterval(() => (setCheckedAll(false)), 100)
      return () => { clearInterval(reset1); }
    }

  }, [setCheckedAll, storedProduct])


  useEffect(() => {

    const fetchData = async () => {
      const purchasedResponse = await JSON.parse(localStorage.getItem('products'));
      if (purchasedResponse) {
        //=========== Filter functions for purchased or checked item =======================
        const FilteredPurchasedItem = purchasedResponse.filter(name => name.check === true);
        setretRievePurchasedItem(FilteredPurchasedItem);
      }
    }
    fetchData();
  }, [storedProduct])


  return (

    <Router>
      <ScrollToTop>
        <Switch>

          <Route exact path="/purchaseditem">
            <PurchasedItem retrievePurchasedItem={retrievePurchasedItem} />
          </Route>

          <Route exact path="/item/edit/:id/:item">
            <EditItem updateItem={updateItem} storedProduct={storedProduct} retrievePurchasedItem={retrievePurchasedItem} />
          </Route>

          <Route exact path="/">
            <MainPage addToStorage={addToStorage} handleClickDelete={handleClickDelete} updateItem={updateItem} notification={notification} setNotification={setNotification} storedProduct={storedProduct} checkCompleted={checkCompleted} retrievePurchasedItem={retrievePurchasedItem} checkCompletedAll={checkCompletedAll} checkedAll={checkedAll} handleClickDeleteAll={handleClickDeleteAll} />
          </Route>

        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default App;
