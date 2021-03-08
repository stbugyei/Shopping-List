import React, { useState, useEffect } from 'react'
import { useParams, useHistory, withRouter } from "react-router-dom";
import { IoCartOutline } from 'react-icons/io5';
import currentDate from './CurrentDate';
import totalAmount from './TotalAmount';


const EditItem = (props) => {

    const { updateItem, storedProduct, retrievePurchasedItem } = props
    const { localTime } = currentDate();
    const { reducer } = totalAmount();
    const { id } = useParams();
    const history = useHistory();

    const [currentProduct, setCurrentProduct] = useState('')

    useEffect(() => {
        const producItem = storedProduct.find((item) => {
            return item.id === id
        })
        setCurrentProduct(producItem)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])


    //========= An onChange event for updating the products =========
    const handleChange = e => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value })
    }


    //========= onSubmit function for saving edited item =========
    const handleSubmit = e => {
        updateItem(currentProduct, id);
        history.push("/");
    };

    const onSubmit = e => {
        e.preventDefault();
    };

    if (!(currentProduct && Object.keys(currentProduct).length)) { return '' }

    //======= Navigation functions ========
    const handlePurchased = () => {
        history.push("/purchaseditem");
    }

    const handleHome = () => {
        history.push("/");
    }


    const { item, price, quantity } = currentProduct;

    //======== function for computing price and quantity ============
    const addPrice = (price, quantity) => {
        const sum = (((parseFloat(price)) * (parseFloat(quantity))));
        return sum.toFixed(1)
    }

    //======== Update the total value from currentProduct ============
    currentProduct['total'] = addPrice(price, quantity)


    return (
        <div className="product-wrapper">

            <form className="input-wrapper" onSubmit={onSubmit} style={{ backgroundColor: '#9FA8DA', transition: '0.4s' }}>

                <div className="logo-time">
                    <div className="logo">stbugyei</div>
                    <div>{localTime}</div>
                </div>

                <div className="banner">
                    <div className="banner-cart" onClick={handlePurchased}>
                        <IoCartOutline className="banner-cart__outline" />
                        <h4> Purchased Item</h4>
                        {retrievePurchasedItem ? <span className="btn-cart">{retrievePurchasedItem.length}</span> : ''}
                    </div>
                    <div className="title">
                        <h1>My Shopping CheckList</h1>
                        <h4> <span style={{ color: 'darkblue' }}>Total Amount:</span>  <span>{((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(reducer)))}</span></h4>
                    </div>
                </div>

                <input type="text" className="input-field" placeholder="Add Item..."
                    name="item"
                    value={item || ""}
                    onChange={handleChange}
                />

                <div className="price-quantity">
                    <input type="text" className="input-field" placeholder="Add Quantity..." style={{ width: '48%' }}
                        name="quantity"
                        value={quantity || ""}
                        onChange={handleChange}
                    />

                    <input type="text" className="input-field" placeholder="Add Price..." style={{ width: '48%' }}
                        name="price"
                        value={price || ""}
                        onChange={handleChange}
                    />
                </div>

                <div style={{ display: 'flex' }}>

                    <button className="btn-add" style={{ width: '45%', color: 'red' }} onClick={() => handleHome()}>
                        Cancel
                </button>

                    <button className="btn-add" style={{ width: '45%', color: 'darkblue' }} onClick={() => { handleSubmit(); handleHome() }}>
                        Save
                    </button>
                </div>

            </form>

            <span className="loader" ><h1>You're About To Edit <span style={{ color: 'red' }}> {item} </span> &#128521;</h1></span>
        </div>
    )
}

export default withRouter(EditItem)
