import React from 'react'

const DialogueBox = (props) => {

    const { handleClose, isopen } = props

    let dialogue = (
        <div className="dialogue-wrapper">
            <div className="dialogue-content">
                <div style={{ width: '100%' }}>
                    <button className="btn-close" onClick={handleClose}>
                        <i className="far fa-times-circle"></i>
                    </button>
                </div>

                <span style={{ display:'block', fontSize: '70px', color: 'red', textAlign:'center' }}><i className="fas fa-question-circle"></i></span>

                <div>{props.children}</div>
            </div>

        </div>
    );

    if (!isopen) {
        dialogue = null
    }


    return (
        <>
            {dialogue}
        </>
    )
}

export default DialogueBox
