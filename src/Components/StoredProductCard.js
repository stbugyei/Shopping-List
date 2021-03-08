import React, { useState } from 'react'
import { withRouter, useHistory } from "react-router-dom";
import { IoTrashOutline } from 'react-icons/io5';
import DialogueBox from './DialogueBox';
import Notification from './Notification';
import CheckBoxDialogue from './CheckBoxDialogue';

const StoredProductCard = (props) => {

    const history = useHistory();

    const { stored, handleClickDelete, retrieveProduct, notification, setNotification, checkCompleted, i } = props

    const [isopen, setIsopen] = useState(false)
    const [isChecked, setIsChecked] = useState(false)

    const handleClose = () => {
        setIsopen(false)
    }

    const handleCloseCheck = () => {
        setIsChecked(false)
    }

    //======= Navigation functions for Edit========
    const handleEdit = () => {
        if ((stored.check === true)) {
            setIsChecked(true)
        } else {
            history.push(`/item/edit/${stored.id}/${stored.item}`);
        }
    }

    //========== Onclick function to move the page to the top ===========//
    const scrollTotop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) }


    return (
        <>
            <div className="value">
                <label htmlFor={stored.id}>
                    <input
                        id={stored.id}
                        value={stored.item}
                        type="checkbox"
                        checked={stored.check}
                        onChange={(e) => checkCompleted(e, stored.id)}
                    />
                    <b></b>
                    {stored.item ? <span style={{ marginLeft: "15px" }}>{stored.item}</span> : 'null'}
                </label>
            </div>

            <div className="btn-del__edt" style={{ padding: '5px', marginLeft: 'auto', marginRight: '0' }}>
                <button className="btn-delete" style={{ marginRight: '25px', fontSize: '20px', fontWeight: 'bold', color: 'blueviolet' }} onClick={() => { (handleEdit()); scrollTotop()}}>
                    <i className="far fa-edit"></i>
                </button>

                <button className="btn-delete" onClick={() => { setIsopen(true);scrollTotop()}}>
                    <IoTrashOutline style={{ color: 'salmon', fontSize: '20px', fontWeight: 'bold', transition: 'all .4s' }} />
                </button>

            </div>

            <div className="form-values">
                <div className="quantity">
                    <span>Qty:</span>   {stored.quantity ? <span> {stored.quantity}</span> : 'null'}
                </div>

                <div className="price">
                    <span>Price: €</span>  {stored.price ? <span> {stored.price}</span> : 'null'}
                </div>

                <div className="total">
                    <span>Amt:</span> {stored.total ? <span>{((new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(stored.total)))}</span> : 'null'}
                </div>
            </div>

            {
                (!(stored.check === true)) ?
                    <DialogueBox isopen={isopen} handleClose={handleClose}>
                        <div className="confirm-title"> <h4>Do You Want To Remove <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> ?</h4></div>
                        <div className="btn-yes__wrapper">
                            <button className="btn-no" onClick={() => handleClose()}>No</button>
                            <button className="btn-yes" onClick={() => { handleClickDelete(retrieveProduct[i]); handleClose() }}>Yes</button>
                        </div>
                    </DialogueBox>
                    :
                    <DialogueBox isopen={isopen} handleClose={handleClose}>
                        <div className="confirm-title"> <h4> <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> is marked <span style={{ color: 'red' }}>&#9745;</span> as purchased, do you still want to Remove&#33; </h4></div>

                        <div className="btn-yes__wrapper">
                            <button className="btn-no" onClick={() => handleClose()}>No</button>
                            <button className="btn-yes" onClick={() => { handleClickDelete(retrieveProduct[i]); handleClose() }}>Yes</button>
                        </div>
                    </DialogueBox>
            }

            <CheckBoxDialogue isChecked={isChecked} handleCloseCheck={handleCloseCheck}>
                <div className="confirm-title"> <h4> <span style={{ color: 'red', textTransform: 'uppercase' }}>{stored.item}</span> is marked  <span style={{ color: 'red' }}>&#9745;</span> as purchased, do you still want to Edit&#33; </h4></div>

                <div className="btn-yes__wrapper">
                    <button className="btn-no" style={{ backgroundColor: 'salmon' }} onClick={() => handleCloseCheck()}>No</button>
                    <button className="btn-yes" style={{ color: 'salmon' }} onClick={() => history.push(`/item/edit/${stored.id}/${stored.item}`)}>Yes</button>
                </div>
            </CheckBoxDialogue>

            { notification ? <Notification notification={notification} setNotification={setNotification} /> : ''}
        </>
    )
}


export default withRouter(StoredProductCard)


