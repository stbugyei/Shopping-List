import React, { useState, useEffect } from 'react'
import { IoTrashOutline } from 'react-icons/io5';

const StoredProducts = (props) => {

    const { handleClickDelete } = props

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
        let interval = setInterval(() => fetchData(), 1000);

        return () => {
            clearInterval(interval);
        }
    }, [retrieveProduct])



    if (!(retrieveProduct && Object.keys(retrieveProduct).length)) {
        return (
            <span className="loader"><h1>Hello! Please Add Item To Your Checklist &#128522;</h1></span>
        )
    }

    const productCard = retrieveProduct.map((stored, i) => {
        if (!retrieveProduct) { return '' }

        return (
            <div className="form-wrapper" key={stored.id} style={{ borderColor: stored.color }}>
                <span className="sidebar" style={{ backgroundColor: stored.color}}></span>

                <div className="value">
                    <label htmlFor={stored.id}>
                        <input
                            id={stored.id}
                            name={stored.item}
                            type="checkbox"
                            defaultChecked={localStorage.getItem(`${stored.id}`) === "true" ? 'defaultChecked' : ''}
                            onChange={(e) => selectOption(e, `${stored.id}`)}
                        />
                        <b></b>
                        {stored.item ? <span style={{ marginLeft: "5px" }}>{stored.item}</span> : 'null'}
                    </label>
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

                <button className="btn-delete" onClick={() => handleClickDelete(retrieveProduct[i])}>
                    <IoTrashOutline style={{ color: 'salmon', fontSize: '20px', fontWeight: 'bold', transition: 'all .4s' }} />
                </button>
            </div>
        )
    })

    return (
        <>
            {productCard}
        </>
    )
}

export default StoredProducts
