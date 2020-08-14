import React from 'react';
import Spinner from 'react-spinkit';
import { Modal } from 'react-bootstrap';

import '../styles/Loading.css';

export default function Loading(props) {
    return (
        <>
            <Modal
                show={props.showModal}
                dialogAs="div"
                centered
            >
                <Modal.Body className="loading-modal">
                    <Spinner
                        name='pacman'
                        fadeIn='none'
                        color='white'
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}