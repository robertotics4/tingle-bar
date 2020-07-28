import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import './Login.css';
import Loading from '../../components/Loading';
import logo from '../../assets/logo.png';

function initialState() {
    return { user: '', password: '' };
}

function initialUiProps() {
    return {
        error: '',
        loading: false,
        disabled: false
    };
}

async function authenticate(credentials) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (credentials.usuario === 'admin' && credentials.senha === '1234')
                resolve({ token: 'accessToken', usuario: { id: 1, nome: 'admin' } });
            else
                reject({ error: 'Falha ao logar' });
        }, 2000);
    });
}

export default function Login() {
    const [values, setValues] = useState(initialState);
    const [uiProps, setUiProps] = useState(initialUiProps);

    const history = useHistory();
    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur'
    });

    useEffect(() => {
        setUiProps({ ...uiProps, disabled: uiProps.loading });
    }, [uiProps.loading]);

    function onChange(event) {
        const { value, name } = event.target;
        setValues({
            ...values,
            [name]: value,
        });
        setUiProps({ ...uiProps, error: '' });
    }

    async function onSubmit(event) {
        setUiProps({ ...uiProps, loading: true });

        const credentials = {
            usuario: values.user,
            senha: values.password,
        };

        const { token, usuario, error } = await authenticate(credentials);

        if (token) {
            return history.push('/');
        }

        setUiProps({ ...uiProps, loading: false, error });
        setValues(initialState);
    }

    let alert;

    if (uiProps.error !== '' && uiProps.loading === false)
        alert = <div className="login-alert" role="alert">{uiProps.error}</div>

    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <img src={logo} className="login-logo" alt="logo-equatorial" />
                    <h2>Autenticação</h2>
                    <p>Digite seus dados para acessar.</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">

                            <div className="form-group">
                                <label>Usuário</label>
                                <input
                                    ref={register({
                                        required: "Insira seu usuário"
                                    })}
                                    disabled={uiProps.disabled}
                                    type="text"
                                    name="user"
                                    className={errors.user ? "form-control is-invalid" : "form-control"}
                                    onChange={onChange} value={values.user}
                                    placeholder="Usuário"
                                />
                                <span className="invalid-feedback is-invalid">{errors.user ? errors.user.message : null}</span>
                            </div>

                            <div className="form-group">
                                <label>Senha</label>
                                <input
                                    ref={register({
                                        required: "Insira sua senha"
                                    })}
                                    disabled={uiProps.disabled}
                                    type="password"
                                    name="password"
                                    className={errors.password ? "form-control is-invalid" : "form-control"}
                                    onChange={onChange}
                                    value={values.password}
                                    placeholder="Senha"
                                />
                                <span className="invalid-feedback is-invalid">{errors.password ? errors.password.message : null}</span>
                            </div>

                            <button disabled={uiProps.disabled} type="submit" className="btn btn-black btn-block">
                                {uiProps.loading ? <Loading loading={uiProps.loading} message={'Verificando...'} /> : <span>Efetuar login</span>}
                            </button>

                            {alert}

                        </form>
                    </div>
                </div>
            </div>
        </div>

    );
}
