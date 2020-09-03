import React from 'react';

export default function BadgeStatus(props) {
    function getBadgeClass() {
        let stringClass = '';

        switch (props.status) {
            case 'Entregue':
                stringClass = "badge badge-success";
                break;
            case 'Solicitado':
                stringClass = "badge badge-info";
                break;
            case 'Pedido pronto':
                stringClass = "badge badge-warning";
                break;
            case 'Cancelado':
                stringClass = "badge badge-danger";
                break;
            default:
                stringClass = "badge";
                break;
        }

        return stringClass;
    }

    return <span className={getBadgeClass()}>{props.status}</span>
}
