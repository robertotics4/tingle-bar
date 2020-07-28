import React from 'react';

export default function Alert(props) {
    let alert, icon;

    switch (props.type) {
        case 'success':
            alert = "alert alert-success alert-dismissible";
            icon = "icon fas fa-check";
            break;
        case 'danger':
            alert = "alert alert-danger alert-dismissible";
            icon = "icon fa fa-ban";
            break;
        case 'info':
            alert = "alert alert-info alert-dismissible";
            icon = "icon fa fa-info";
            break;
        case 'warning':
            alert = "alert alert-warning alert-dismissible";
            icon = "icon fa fa-warning";
            break;
    }

    return (
        <div className={alert}>
            <button type="button" className="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <i className={icon}></i>
            {props.message}
        </div>
    );
}
