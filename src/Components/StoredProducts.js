import React, { useState, useEffect } from 'react'
import { withRouter} from "react-router-dom";
import StoredProductCard from './StoredProductCard';


const StoredProducts = (props) => {

    const { handleClickDelete, addPurchasedStorage, notification, setNotification, storedProduct } = props

    const [retrieveProduct, setRetrieveProduct] = useState('');

    //=========== persistent checked state Function ============
    const selectOption = (e, value) => {
        if (e.target.checked) {
            localStorage.setItem(value, e.target.checked);

        } else {
            localStorage.removeItem(value);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const productsResponse = await JSON.parse(localStorage.getItem('products'));
            if (productsResponse) {
                setRetrieveProduct(productsResponse);
            }
        }
        fetchData()
    }, [storedProduct])


    useEffect(() => {
        const reset = setInterval(() => (setNotification("")), 15000)
        return () => {
            clearInterval(reset);
        }
    }, [setNotification])


    if (!(retrieveProduct && Object.keys(retrieveProduct).length)) {
        return (
            <span className="loader"><h1>Hello! Please Add Item To Your Checklist 😍</h1></span>
        )
    }


    const productCard = retrieveProduct.map((stored, i) => {
        if (!retrieveProduct) { return '' }
        return (
            <div className="form-wrapper" key={i} style={{ borderColor: stored.color }}>
                {/* <span className="sidebar" style={{ backgroundColor: stored.color }}></span> */}
                <StoredProductCard
                    stored={stored} handleClickDelete={handleClickDelete} selectOption={selectOption} addPurchasedStorage={addPurchasedStorage} retrieveProduct={retrieveProduct} i={i} notification={notification} setNotification={setNotification} 
                />
            </div>
        )
    })

    return (
        <>
            {productCard}
        </>
    )
}

export default withRouter(StoredProducts)
