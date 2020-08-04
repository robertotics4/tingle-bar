import React from 'react';

export default function CardPedido(props) {
    return (
        <div className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch">
            <div className="card bg-light col-12">
                <div className="card-header text-muted border-bottom-0">
                    <h3>Mesa: {props.mesa} / Pedido: {props.numeroPedido}</h3>
                </div>
                <div className="card-body pt-0">
                    <div className="col-12">
                        <ul className="ml-0 mb-0 fa-ul text-muted list-group list-group-flush">
                            {props.itens.map((item, index) => {
                                let linha = `${item.produto}`;

                                if (item.quantidade)
                                    linha += `  /  qtd: ${item.quantidade}`;
                                if (item.porcao)
                                    linha += `  /  porção: ${item.porcao}`;

                                return <li style={{ fontSize: "16px", backgroundColor: "transparent" }} key={index} className="medium list-group-item">{linha}</li>;
                            })}
                        </ul>
                            
                        <div className="mt-4 mb-0">
                            <div className="row">
                                <div className="col-12">Atendente: {props.atendente}</div>
                            </div>

                            <div className="row">
                                <div className="col-12">Tempo de espera: {props.tempoEspera}</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{ backgroundColor: "transparent" }} className="card-footer mb-2 mt-0">
                    <div className="text-center">
                        <a href="#" className="btn btn-lg btn-primary btn-block">Pronto</a>
                        <a href="#" className="btn btn-lg btn-success btn-block">Entregue</a>
                    </div>
                </div>
            </div>
        </div>
    );
}