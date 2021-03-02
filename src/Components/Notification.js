import React from 'react'

function Notification(props) {

    const { notification, setNotification } = props
    
    const notifStyle = {
        color: '',
    }

    if (notification.includes('Added')) {
        notifStyle.color = '#fff'
    }

    if (notification.includes('Removed')) {
        notifStyle.color = 'red'
    }


    return (
        <div className="dialogue-wrapper" >
            <div className="dialogue-content" style={{borderRadius:'0'}}>
                <h5 className="notification">{notification}</h5>

                <button className="btn-no" style={{ width: '100%', marginBottom: '10px' }} onClick={() => setNotification("") }>OK</button>
            </div>
        </div>
    )
}

export default Notification
