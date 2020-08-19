import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Loading from '../../components/Loading';
import FormLoginEstabelecimento from '../../components/FormLoginEstabelecimento';

export default function LoginEstabelecimento() {
    const [key, setKey] = useState('tabEstabelecimento');
    const [isLoadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => { }, [isLoadingVisible]);

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Tingle</b>Bar</a>
                </div>
                {/* /.login-logo */}

                <Tabs
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                >
                    <Tab eventKey="tabEstabelecimento" title="Estabelecimento">
                        <FormLoginEstabelecimento setLoadingVisible={setLoadingVisible}/>
                    </Tab>
                    <Tab eventKey="tabFuncionario" title="Funcionário">
                        <FormLoginEstabelecimento setLoadingVisible={setLoadingVisible} />
                    </Tab>
                </Tabs>

            </div>
            {/* /.login-box */}

            {isLoadingVisible ? <Loading showModal={isLoadingVisible} /> : null}
        </div>
    );
}