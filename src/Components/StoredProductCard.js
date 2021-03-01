import React from 'react'
//import { IoTrashOutline } from 'react-icons/io5';

const StoredProductCard = (props) => {

   // let allStorageKeys = Object.keys(localStorage);

    const { handleClick, stored, isopen, handleClickDelete } = props


    return (
        <div className={isopen ? 'confirm' : 'confirm-annex'}>
{/* 
                {(allStorageKeys.includes(`${stored.id}`)) ?
                    <>
                        <div className="confirm-title"> <h4>Please uncheck {stored.item} before remove</h4></div>

                        <div className="btn-yes" onClick={handleClick}>OK</div>
                    </>
                    :
                    <> */}
                        <div className="btn-close" onClick={handleClick}><i className="far fa-times-circle"></i></div>

                        <div className="confirm-title"> <h4>Do you want to Remove {stored.item}</h4></div>

                        <div className="btn-yes" onClick={() => handleClickDelete(stored)}>Yes</div>
                    {/* </>
                    } */}
        </div>
    )
}


export default StoredProductCard
