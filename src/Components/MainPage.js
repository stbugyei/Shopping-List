import React, { useState } from 'react'
import useLocalStorage from "./useLocalStorage"
import StoredProducts from './StoredProducts';
import currentDate from './CurrentDate';
import totalAmount from './TotalAmount';

const MainPage = () => {

    const { localTime } = currentDate();
    const { reducer } = totalAmount();

    const [product, setProduct] = useState({
        id: "",
        item: "",
        quantity: "",
        price: "",
        total: ""
    });

    const [storedProduct, setStoredProduct] = useLocalStorage("products", []);

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

    //====== Adding items to localStorage  ====== 
    const addToStorage = (items) => {
        if (!storedProduct.some(fav => fav.id === items.id)) {
            setStoredProduct([...storedProduct, items])
        }
    }

    //====== Removing items from localStorage  ====== 
    const handleClickDelete = (items) => {
        const newList = storedProduct.filter((item) => item.id !== items.id)
        setStoredProduct(newList)
    }

    return (
        <div className="product-wrapper">
            <form className="input-wrapper" onSubmit={handleSubmit}>

                <div className="logo-time">
                    <div className="logo">stbugyei</div>
                    <div>{localTime}</div>
                </div>

                <div className="title">
                    <h1>My Shopping CheckList</h1>
                    {(localTime !== 'undefined' || localTime !== null) ? <h4 style={{ color: '#ddd' }}>Total Amount: {((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(reducer)))}</h4> : ''}
                </div>

                <input type="text" className="input-field" placeholder="Add Item"
                    name="item"
                    value={product.item || ""}
                    onChange={handleChange}
                />

                <div className="price-quantity">
                    <input type="text" className="input-field" placeholder="Add Quantity" style={{ width: '48%' }}
                        name="quantity"
                        value={product.quantity || ""}
                        onChange={handleChange}
                    />

                    <input type="text" className="input-field" placeholder="Add Price" style={{ width: '48%' }}
                        name="price"
                        value={product.price || ""}
                        onChange={handleChange}
                    />
                </div>

                <button className="btn-add" onClick={() => addToStorage(product)}>
                    Add product to list
                </button>
        
            </form>

            <StoredProducts handleClickDelete={handleClickDelete} product={product} />
        </div>
    )
}

export default MainPage
