import React, { useState, useEffect } from 'react'
import { withRouter} from "react-router-dom";
import StoredProductCard from './StoredProductCard';


const StoredProducts = (props) => {

    const { handleClickDelete, notification, setNotification, storedProduct, checkCompleted } = props

    const [retrieveProduct, setRetrieveProduct] = useState('');


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
                    stored={stored} handleClickDelete={handleClickDelete} retrieveProduct={retrieveProduct} i={i} notification={notification} setNotification={setNotification} checkCompleted={checkCompleted}
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
