import React from 'react';
import Spinner from 'react-spinkit';

import '../styles/Loading.css';

const Loading = ({ loading, message }) => {
    return loading ? (
        <div className='overlay-content'>
            <div className='loading-content wrapper'>
            <span className='message'>
                    {message}
                </span>
                <Spinner
                    overrideSpinnerClassName="spinner-icon"
                    name='circle'
                    fadeIn='none'
                    color='white'
                />
            </div>
        </div>
    ) : null
};

export default Loading;