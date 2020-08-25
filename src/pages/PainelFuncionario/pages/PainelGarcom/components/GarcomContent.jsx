import React, { useState, useEffect } from 'react';

import api from '../../../../../services/api';

import Mesa from './Mesa';

export default function GarcomContent() {
    function onRadioChange(event) {
        const { value } = event.target;
    }

    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Monitor de Gerente</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Gerente</a></li>
                                <li className="breadcrumb-item active">Monitor de Gerente</li>
                            </ol>
                        </div>
                    </div>

                    <div className="row mb-2 ml-0">
                        <div className="form-group" style={{ display: 'flex', flexDirection: 'row' }}>
                            <div className="custom-control custom-radio">
                                <input
                                    className="custom-control-input"
                                    type="radio" id="radioTodas"
                                    name="customRadio"
                                    value=""
                                    onChange={onRadioChange}
                                    defaultChecked
                                />
                                <label htmlFor="radioTodas" className="custom-control-label">Todas as mesas</label>
                            </div>
                            <div className="custom-control custom-radio ml-3">
                                <input
                                    className="custom-control-input"
                                    type="radio"
                                    id="radioApenasGarcom"
                                    name="customRadio"
                                    value="1"
                                    onChange={onRadioChange}
                                />
                                <label htmlFor="radioApenasGarcom" className="custom-control-label">Apenas mesas do garçom</label>
                            </div>
                        </div>
                    </div>

                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">



                </div>
            </section>
            {/* /.content */}
        </div>
    );
}
