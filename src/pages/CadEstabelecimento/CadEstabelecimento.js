import React from 'react';

import './CadEstabelecimento.css';

export default function CadEstabelecimento() {
    return (
        <div>
            <section className="testimonial py-5" id="testimonial">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-4 py-5 bg-primary text-white text-center ">
                            <div className=" ">
                                <div className="card-body">
                                    <img src="http://www.ansonika.com/mavia/img/registration_bg.svg" style={{ width: '30%' }} />
                                    <h2 className="py-3">Cadastro de estabelecimento</h2>
                                    <p>Tation argumentum et usu, dicit viderer evertitur te has. Eu dictas concludaturque usu, facete detracto patrioque an per, lucilius pertinacia eu vel.
                                </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Insira os dados do seu estabelecimento</h4>
                            <form>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <input id="nomeEstabelecimento" name="nomeEstabelecimento" placeholder="Nome do estabelecimento" className="form-control" type="text" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-10">
                                        <input id="enderecoEstabelecimento" name="enderecoEstabelecimento" placeholder="Endereço do estabelecimento" className="form-control" type="text" />
                                    </div>

                                    <div className="form-group col-md-2">
                                        <input id="numeroEstabelecimento" name="numeroEstabelecimento" placeholder="Nº" className="form-control" type="number" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input type="cnpj" className="form-control" id="inputCnpj" placeholder="CNPJ" />
                                    </div>

                                    <div className="form-group col-md-6">
                                        <select id="tipoEstabelecimento" className="form-control">
                                            <option selected>Tipo de estabelecimento</option>
                                            <option>Bar</option>
                                            <option>Restaurante</option>
                                            <option>Lanchonete</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group  col-md-6">
                                        <input type="text" className="form-control" id="latitudeEstabelecimento" placeholder="Latitude" />
                                    </div>
                                    <div className="form-group  col-md-6">
                                        <input type="text" className="form-control" id="longitudeEstabelecimento" placeholder="Longitude" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group  col-md-12">
                                        <input type="password" className="form-control" id="senhaEstabelecimento" placeholder="Senha" />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultValue id="invalidCheck2" required />
                                                <label className="form-check-label" htmlFor="invalidCheck2">
                                                    <small>Aceito os termos de condições de uso.</small>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <button type="button" className="btn btn-dark btn-lg">Cadastrar</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
