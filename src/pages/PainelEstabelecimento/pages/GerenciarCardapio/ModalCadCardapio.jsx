import React from 'react';

import './styles/ModalCadCardapio.css';

export default function ModalCadCardapio() {
    return (
        <div className="cad-cardapio-modal">
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Cadastro de item no Cardápio</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form role="form">
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="idItemCardapio">ID</label>
                            <input type="text" className="form-control" id="idItemCardapio" placeholder="ID" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tituloItemCardapio">Título</label>
                            <input type="text" className="form-control" id="tituloItemCardapio" placeholder="Título do item" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="descricaoItemCardapio">Descrição</label>
                            <input type="text" className="form-control" id="descricaoItemCardapio" placeholder="Descrição do item" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="valorItemCardapio">Valor</label>
                            <input type="text" className="form-control" id="valorItemCardapio" placeholder="Valor do item" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoriaItemCardapio">Categoria</label>
                            <select className="form-control" id="categoriaItemCardapio">
                                <option>Categoria 1</option>
                                <option>Categoria 2</option>
                                <option>Categoria 3</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="imagemItemCardapio">Imagem do item</label>
                            <div className="input-group">
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="imagemItemCardapio" />
                                    <label className="custom-file-label" htmlFor="exampleInputFile">Selecione a imagem</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="itemCozinhaCardapio" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Item de cozinha ?</label>
                        </div>
                    </div>
                    {/* /.card-body */}
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                        <button type="submit" className="btn btn-secondary ml-3">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}