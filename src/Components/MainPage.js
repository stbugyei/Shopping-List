import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import useLocalStorage from "./useLocalStorage"
import { IoCartOutline } from 'react-icons/io5';
import StoredProducts from './StoredProducts';
import currentDate from './CurrentDate';
import totalAmount from './TotalAmount';


const MainPage = () => {

    const history = useHistory();

    const { localTime } = currentDate();
    const { reducer } = totalAmount();

    const [product, setProduct] = useState({
        id: "",
        item: "",
        quantity: "",
        price: "",
        total: "",
        color: "",
    });

    const [storedProduct, setStoredProduct] = useLocalStorage("products", []);
    const [purchasedProduct, setPurchasedProduct] = useLocalStorage("purchased", []);

    //================ ID =================
    product.id = (Math.random() * 1000000).toFixed(0)


    //================ onChange Function =================
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value })
    }


    //========function for computing price and quantity ============
    const addPrice = () => {
        let price = [];
        let quantity = [];

        if (product.quantity !== null || '') {
            quantity.push(product.quantity)
        }

        if (product.price !== null || '') {
            price.push(product.price)
        }

        const tally = (((parseFloat(price)) * (parseFloat(quantity))))
        return tally.toFixed(1)
    }

    product.total = addPrice();

    //========= Making a random color generator ========= 
    const generateHexaColor = () => {
        let string = '0123456789abcdef'
        let hexaColor = '#'
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * string.length)
            hexaColor += string[index]
        }
        return hexaColor
    }

    product.color = generateHexaColor();

    //====== Adding items to localStorage  ====== 
    const addToStorage = (items) => {
        if (!storedProduct.some(fav => fav.id === items.id)) {
            setStoredProduct([...storedProduct, items])
        }
    }

    //====== Adding items to localStorage  ====== 
    const addPurchasedStorage = (e, items) => {
        if (e.target.checked) {
            if (!purchasedProduct.some(fav => fav.id === items.id)) {
                setPurchasedProduct([...purchasedProduct, items])
            }

        }
        else {
            const newList = purchasedProduct.filter((item) => item.id !== items.id)
            setPurchasedProduct(newList)
        }
    }

    //====== Removing items from localStorage  ====== 
    const handleClickDelete = (items) => {
        //get all key values from localStorage and compare with the id of the item;
        let allStorageKeys = Object.keys(localStorage);
        if (allStorageKeys.includes(`${items.id}`)) {
            alert(`Please uncheck ${items.item}\nbefore Remove`);
        }
        else {
            if (window.confirm(`Do you want to Remove ${items.item}?`)) {
                const newList = storedProduct.filter((item) => item.id !== items.id)
                setStoredProduct(newList)
            }
        }
    }


    //======= Navigation functions ========
    const handlePurchased = () => {
        history.push("/purchaseditem");
    }


    return (
        <div className="product-wrapper">
            <form className="input-wrapper" onSubmit={handleSubmit}>

                <div className="logo-time">
                    <div className="logo">stbugyei</div>
                    <div>{localTime}</div>
                </div>

                <div className="banner">
                    <div className="banner-cart" onClick={handlePurchased}>
                        <IoCartOutline className="banner-cart__outline" />
                        <h4>View Cart</h4>
                        <span className="btn-cart">{purchasedProduct.length}</span>
                    </div>
                    <div className="title">
                        <h1>My Shopping CheckList</h1>
                        <h4> <span style={{ color: 'chartreuse' }}>Total Amount:</span>  <span>{((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(reducer)))}</span></h4>
                    </div>
                </div>

                <input type="text" className="input-field" placeholder="Add Item..."
                    name="item"
                    value={product.item || ""}
                    onChange={handleChange}
                />

                <div className="price-quantity">
                    <input type="text" className="input-field" placeholder="Add Quantity..." style={{ width: '48%' }}
                        name="quantity"
                        value={product.quantity || ""}
                        onChange={handleChange}
                    />

                    <input type="text" className="input-field" placeholder="Add Price..." style={{ width: '48%' }}
                        name="price"
                        value={product.price || ""}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn-add" onClick={() => addToStorage(product)}>
                    Click to Add item to list
                </button>

            </form>
            <StoredProducts handleClickDelete={handleClickDelete} product={product} addPurchasedStorage={addPurchasedStorage} />
        </div>
    )
}

export default MainPage
