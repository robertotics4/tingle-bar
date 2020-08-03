import React from 'react';

import CadFuncionario from './CadFuncionario';
import ListaFuncionarios from './ListaFuncionarios';

export default function Content() {
    return (
        <div className="content-wrapper">

            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Funcionários</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Funcionários</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>

            {/* Main content */}
            <section className="content">
                <div className="container-fluid">

                    {/* <ListaFuncionarios /> */}
                    <div className="col-md-8">
                        <CadFuncionario />
                    </div>



                </div>
            </section>
            {/* /.content */}

        </div>
    );
}
