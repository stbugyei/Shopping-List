import React from 'react'

const CheckBoxDialogue = (props) => {
    const { handleCloseCheck, isChecked, children } = props

    let dialogue = (
        <div className="dialogue-wrapper">
            <div className="dialogue-content">
                <div style={{ width: '100%', marginBottom: '15px', color:'salmon' }}>
                    <button className="btn-close" style={{ color:'salmon' }}>
                        <i className="far fa-times-circle" onClick={handleCloseCheck}></i>
                    </button>
                </div>

                <span style={{ display: 'block', fontSize: '70px', color: 'salmon', textAlign: 'center' }}><i className="fas fa-question-circle"></i></span>

                <div>{children}</div>
            </div>

        </div>
    );

    if (!isChecked) {
        dialogue = null
    }


    return (
        <>
            {dialogue}
        </>
    )
}

export default CheckBoxDialogue
