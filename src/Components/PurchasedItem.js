import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import PurchasedCard from '../PurchasedCard';
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
                <div className="input-wrapper" style={{ background: 'linear-gradient(-45deg, white, blueviolet)' }}>

                    <div className="logo-time">
                        <div className="logo">stbugyei</div>
                        <div>{localTime}</div>
                    </div>

                    <div className="title" >
                        <h2 style={{ margin: '15px' }}>My Shopping CheckList</h2>
                        <h4 style={{ margin: '0px 15px 15px' }}>Total Purchased Amount: NaN €</h4>
                    </div>

                    <button className="btn-add" onClick={handleHome}>
                        <i className="fas fa-arrow-left"></i>  Back to list Item</button>

                    <span style={{ color: '#fff', fontSize: '20px', margin: '10px 0px 0px 10px', fontWeight: '600' }}>Purchased Item</span>

                </div>
                <span className="loader"><h1>Hi! You Have Not Purchased any Item Yet &#128522;</h1></span>
            </div>
        )
    }


    let totalSummary = retrievePurchasedItem.map((total => ((total.total))))
    let reducer = totalSummary.reduce(function (prev, curr) {
        return (Number(prev) || 0) + (Number(curr) || 0);
    });

    return (
        <div className="product-wrapper">

            <div className="input-wrapper" style={{ background: 'linear-gradient(-45deg, white, blueviolet)' }}>

                <div className="logo-time">
                    <div className="logo">stbugyei</div>
                    <div>{localTime}</div>
                </div>

                <div className="title" >
                    <h2 style={{ margin: '15px' }}>My Shopping CheckList</h2>
                    <h4 style={{ margin: '0px 15px 15px' }}>Total Purchased Amount: {reducer ? <span style={{ color: 'red' }}>{((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(reducer)))}</span> : NaN}</h4>
                </div>

                <button className="btn-add" onClick={handleHome}>
                    <i className="fas fa-arrow-left"></i>  Back to list Item
                </button>

                <span style={{ color: '#fff', fontSize: '20px', margin: '10px 0px 0px 10px', fontWeight: '600' }}>Purchased Item</span>

            </div>

            <PurchasedCard retrievePurchasedItem={retrievePurchasedItem} />

        </div>
    )
}

export default PurchasedItem
