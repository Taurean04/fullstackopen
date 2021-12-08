import React from 'react';

const Notification = ({error, success}) => {
    if(error === null && success === null) {
        return null;
    }
    let className = 'success';
    if(error !== null) {
        className = 'error';
    }
    return(
        <div className={`${className} notification`}>{success !== null ? success : error}</div>
    );
}

export default Notification