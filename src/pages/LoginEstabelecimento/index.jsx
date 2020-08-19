import React, { useState, useEffect, useContext } from 'react';

import Loading from '../../components/Loading';
import FormLoginEstabelecimento from '../../components/FormLoginEstabelecimento';

export default function LoginEstabelecimento() {

    const [isLoadingVisible, setLoadingVisible] = useState(false);

    useEffect(() => { }, [isLoadingVisible]);

    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Tingle</b>Bar</a>
                </div>
                {/* /.login-logo */}

                <FormLoginEstabelecimento setLoadingVisible={setLoadingVisible} />
                
            </div>
            {/* /.login-box */}

            {isLoadingVisible ? <Loading showModal={isLoadingVisible} /> : null}
        </div>
    );
}