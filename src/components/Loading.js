import React from 'react';
import Spinner from 'react-spinkit';

import '../styles/Loading.css';

export default function Loading() {
    return (
        <div className="loading-modal">
            <Spinner
                name='pacman'
                fadeIn='none'
                color='white'
            />
        </div>
    );
}