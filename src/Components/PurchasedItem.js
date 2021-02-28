import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import currentDate from './CurrentDate';


const PurchasedItem = () => {

    const history = useHistory();

    const [retrievePurchasedItem, setretRievePurchasedItem] = useState('');

    const { localTime } = currentDate();

    //======= Navigation functions ========
    const handleHome = () => {
        history.push("/");
    }

    useEffect(() => {
        const fetchData = async () => {
            const purchasedResponse = await JSON.parse(localStorage.getItem('purchased'));
            if (purchasedResponse) {
                setretRievePurchasedItem(purchasedResponse);
            }
        }
        let interval = setInterval(() => fetchData(), 1000);

        return () => {
            clearInterval(interval);
        }
    }, [retrievePurchasedItem])

    if (!(retrievePurchasedItem && Object.keys(retrievePurchasedItem).length)) {
        return (
            <div className="product-wrapper">
                <span className="loader"><h1>Hi! You Have Not Purchased any Item Yet &#128522;</h1></span>
                <button className="btn-add" onClick={handleHome}>
                    <i className="fas fa-arrow-left"></i>  Back to list Items
                </button>
           </div>
        )
    }

    let totalSummary = retrievePurchasedItem.map((total => ((total.total))))

    let reducer = totalSummary.reduce(function (prev, curr) {
        return (Number(prev) || 0) + (Number(curr) || 0);
    });

    const productCard = retrievePurchasedItem.map((stored, i) => {
        if (!retrievePurchasedItem) { return '' }

        return (

            <div className="form-wrapper" key={stored.id} style={{ borderColor: stored.color }}>
                {/* <span className="sidebar" style={{ backgroundColor: stored.color}}></span> */}

                <div className="value1">
                    {stored.item ? <span style={{ marginLeft: "5px" }}>{stored.item}</span> : 'null'}
                </div>

                <div className="quantity">
                    {stored.quantity ? <span> Qty: {stored.quantity}</span> : 'null'}
                </div>

                <div className="price">
                    {stored.price ? <span>€ {stored.price}</span> : 'null'}
                </div>

                <div className="total">
                    {stored.total ? <span> {((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(stored.total)))}</span> : 'null'}
                </div>

            </div>
        )
    })

    return (
        <div className="product-wrapper">

            <div className="input-wrapper" style={{ backgroundColor: '#9C27B0' }}>

                <div className="logo-time">
                    <div className="logo">stbugyei</div>
                    <div>{localTime}</div>
                </div>

                <div className="title" >
                    <h2 style={{margin:'15px'}}>My Shopping CheckList</h2>
                    <h4>Total Purchased Amount: <span style={{ color: 'turquoise' }}>{((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(reducer)))}</span></h4>
                </div>

                <button className="btn-add" onClick={handleHome}>
                    <i className="fas fa-arrow-left"></i>  Back to list Item
                </button>

                <span style={{color:'#fff', fontSize:'20px', padding:'10px', fontWeight:'600'}}>Purchased Item</span>

            </div>
            { productCard}
        </div>
    )
}

export default PurchasedItem
