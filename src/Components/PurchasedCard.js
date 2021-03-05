import React from 'react'

const PurchasedCard = (props) => {

    const { retrievePurchasedItem } = props

    const productCard = retrievePurchasedItem.map((stored, i) => {

        return (

            <div className="form-wrapper" key={stored.id} style={{ borderColor: stored.color }}>
                {/* <span className="sidebar" style={{ backgroundColor: stored.color}}></span> */}

                <div className="value1" style={{padding:'5px'}}>
                    {stored.item ? <span>{stored.item}</span> : 'null'}
                </div>

                <div className="quantity" style={{ width:'initial',marginLeft: 'auto', marginRight: '0' }}>
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
        <>
          {productCard}  
        </>
    )
}

export default PurchasedCard
