import React, { useState } from 'react';
import RegisterService from '../service/register';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/loading';
import { Message } from '../components/message';
import Utils from '../utils/utils';
import '../style/register.style.css';

export default function Register() {

    const [viewSelected, setViewSelected] = useState('Body');
    const [textMessage, setTextMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const [documento, setDocumento] = useState('');
    const [password, setPassword] = useState('');

    let navigate = useNavigate();

    function getView() {

        var module;

        switch (viewSelected) {
            case 'Body':
                module = getViewBody()
                break;
            case 'Loading':
                module = <Loading />
                break;
            case 'Message':
                module = <Message
                    setViewSelected={setViewSelected}
                    textMessage={textMessage}
                    typeMessage={typeMessage}
                />
                break;
        }

        return module;
    }

    function getViewBody() {
        return (
            <div id="Content_General">
                <div id="Content_Register">
                    <div id="Card_Register">
                        <div id="Card_Img">
                            <div>
                                <img src="https://app.nominapp.com/static/media/isotipo_amarillo.6ad06d43.svg" />
                            </div>
                        </div>
                        <div className="card-body">
                            <span>Registro usuario</span>
                            <div className="content-separator-card"></div>
                            <div className="content-form">
                                <div className="col-12">
                                    <input id="Text_User" type="text" value={documento} className="input-text" maxLength={20} spellCheck="false" placeholder="Documento" autoComplete="off"
                                        onChange={(input) => {
                                            setDocumento(input.target.value)
                                        }} />
                                </div>
                                <div className="col-12">
                                    <input id="Text_Password" type="password" value={password} className="input-text" maxLength={10} spellCheck="false" placeholder="Password" autoComplete="off"
                                        onChange={(input) => {
                                            setPassword(input.target.value)
                                        }} />
                                </div>
                                <div className="col-12">
                                    <button id="Button_Ingresar" className="button-general"
                                        onClick={() => {
                                            if (validateRegister()) {
                                                userExits()
                                            }
                                        }}>
                                        <label>Registrarme</label>
                                    </button>
                                </div>
                                <div className="col-12">
                                    <span id="Text_Login"
                                        onClick={() => {
                                            navigate('/')
                                        }}>¿Loguearme?</span>
                                    <p >Si ocurre algún problema, comunícate con el administrador del sistema, él te resolverá cualquier inquietud</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    function userExits() {
        setViewSelected('Loading');
        RegisterService.userExits(documento).then((input) => {
            userExitsCallback(input);
        }).catch((error) => {
            showMessage('error');
        });
    }

    function userExitsCallback(input) {
        if (input.length !== 0) {
            showMessage('userExits');
        } else {
            registerUser();
        }
    }

    function registerUser() {
        RegisterService.insertUser({
            documento: documento,
            password: password
        }).then((input) => {
            registerUserCallback(input);
        }).catch((error) => {
            showMessage('error');
        });
    }

    function registerUserCallback(input) {
        if (input) {
            Utils.setCookie('user', input)
            navigate('/Home/Perfil');
        } else {
            showMessage('errorInsert');
        }
    }

    function validateRegister() {

        if (documento === '') {
            showMessage('emptyDocumento');
            return false;
        }

        if (password === '') {
            showMessage('emptyPassword');
            return false;
        }

        return true;
    }

    function showMessage(messageActive) {

        let textMessage = '';
        let typeMessage = '';

        switch (messageActive) {
            case 'emptyDocumento':
                textMessage = '¡Oopps, ocurrió un problema!. El numero de documento no puede estar vacio';
                typeMessage = 'Error'
                break;
            case 'emptyPassword':
                textMessage = '¡Oopps, ocurrió un problema!. La contraseña no puede estar vacia';
                typeMessage = 'Error'
                break;
            case 'userExits':
                textMessage = '¡Oopps, ocurrió un problema!. El usuario se encuentra registrado en nuetra base de datos';
                typeMessage = 'Error'
                break;
            case 'errorInsert':
                textMessage = '¡Oopps, ocurrió un problema!. No se puedo insertar el usuario';
                typeMessage = 'Error'
                break;
            case 'error':
                textMessage = 'Si ocurre algun problema, comunicate con el administrador del sistema, el te resolvera cuqluier inquitud';
                typeMessage = 'Error'
                break;
        }

        setViewSelected('Message');
        setTextMessage(textMessage);
        setTypeMessage(typeMessage);
    }

    return getView();
}