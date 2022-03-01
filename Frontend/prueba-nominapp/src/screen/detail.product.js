
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DetailProductService from '../service/detail.product';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/loading';
import { Message } from '../components/message';

export default function DetailProduct() {

    const [viewSelected, setViewSelected] = useState('Body');
    const [textMessage, setTextMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const [id, setId] = useState(null);
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [inventario, setInventario] = useState(0);
    const [precio, setPrecio] = useState(0);

    let navigate = useNavigate();
    let location =  useLocation();

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
            <div className="margin-medium margin-large margin-extra-large margin-grande">
                <div className="content-title-body">
                    <div className="col-9 col-s-9">
                        <div className="content-title-text">
                            <div>
                                <span>Información del producto</span>
                                <div className="content-separator"></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-3 col-s-4">
                        <div className="content-option-form">
                            <button id="Button_Update" className="button-detail"
                                onClick={() => {
                                    if (validateInsertUpdate()) {
                                        if (location.state.operation === 'Create') {
                                            insertProduct();
                                        } else {
                                            updateProduct();
                                        }
                                    }
                                }}>
                                <label>{location.state.operation === 'Create' ? 'Registrar' : 'Actualizar'}</label>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="content-body">
                    <div className="col-3 col-s-3">
                        <div className="content-option-form">
                            <input id="Text_Codigo" type="text" value={codigo} className="input-text" maxLength={10} spellCheck="false" placeholder="Código" autoComplete="off"
                                onChange={(input) => {
                                    setCodigo(input.target.value);
                                }} />
                        </div>
                    </div>
                    <div className="col-9 col-s-9">
                        <div className="content-option-form">
                            <input id="Text_Decripcion" type="text" value={descripcion} className="input-text" maxLength={50} spellCheck="false" placeholder="Descripción" autoComplete="off"
                                onChange={(input) => {
                                    setDescripcion(input.target.value);
                                }} />
                        </div>
                    </div>
                    <div className="col-6 col-s-6">
                        <div className="content-option-form">
                            <input id="Text_Inventario" type="number" value={inventario} className="input-text" maxLength={10} spellCheck="false" placeholder="Inventario" autoComplete="off"
                                onChange={(input) => {
                                    setInventario(parseInt(input.target.value));
                                }} />
                        </div>
                    </div>
                    <div className="col-6 col-s-6">
                        <div className="content-option-form">
                            <input id="Text_Precio" type="number" value={precio} className="input-text" maxLength={20} spellCheck="false" placeholder="Precio" autoComplete="off"
                                onChange={(input) => {
                                    setPrecio(parseInt(input.target.value))
                                }} />
                        </div>
                    </div>
                    <div className="col-12 col-s-12">
                        <div className="content-body-information">
                            <span>Si tienes alguna duda sobre todos los campos que aparecen en la parte superior, comunícalo al administrador del sistema</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        initModule();
    }, []);

    function initModule() {
        if (location.state.operation === 'Search') {
            getProduct();
        }
    }

    function getProduct() {
        setViewSelected('Loading')
        setTimeout(() => {
            DetailProductService.getProduct(location.state.id)
                .then((input) => {
                    getProductCallback(input);
                }).catch((error) => {
                    showMessage('error');
                });
        }, 1000)
    }

    function getProductCallback(input) {
        if (input) {
            setViewSelected('Body');
            setId(input.id);
            setCodigo(input.codigo);
            setDescripcion(input.descripcion);
            setInventario(input.inventario);
            setPrecio(input.precio);
        } else {
            showMessage('noExitsProduct');
        }
    }

    function insertProduct() {
        DetailProductService.insertProduct({
            codigo: codigo,
            descripcion: descripcion,
            inventario: inventario,
            precio: precio
        }).then((input) => {
            insertProductCallback(input);
        }).catch((error) => {
            showMessage('error');
        });
    }

    function insertProductCallback(input) {
        if (input) {
            navigate('/Home/Product/ListProduct')
        } else {
            showMessage('errorInsert');
        }
    }

    function updateProduct() {
        DetailProductService.updateProduct({
            id: location.state.id,
            codigo: codigo,
            descripcion: descripcion,
            inventario: inventario,
            precio: precio
        }).then((input) => {
            updateProductCallback(input);
        }).catch((error) => {
            showMessage('error');
        });
    }

    function updateProductCallback(input) {
        if (input) {
            navigate('/Home/Product/ListProduct')
        } else {
            showMessage('errorUpdate');
        }
    }

    function validateInsertUpdate() {

        if (codigo === '') {
            showMessage('emptyCodigo');
            return false;
        }

        if (descripcion === '') {
            showMessage('emptyDescripcion');
            return false;
        }

        if (!inventario) {
            showMessage('emptyInventario');
            return false;
        }

        if (!precio) {
            showMessage('emptyPrecio');
            return false;
        }

        return true;
    }

    function showMessage(messageActive) {

        let textMessage = '';
        let typeMessage = '';

        switch (messageActive) {
            case 'emptyCodigo':
                textMessage = '¡Oopps, ocurrió un problema!. El código no puede estar vacio';
                typeMessage = 'Error'
                break;
            case 'emptyPassword':
                textMessage = '¡Oopps, ocurrió un problema!. La descripción no puede estar vacia';
                typeMessage = 'Error'
                break;
            case 'emptyInventario':
                textMessage = '¡Oopps, ocurrió un problema!. El inventario no puede estar vacio';
                typeMessage = 'Error'
                break;
            case 'emptyPrecio':
                textMessage = '¡Oopps, ocurrió un problema!. El precio no puede estar vacio';
                typeMessage = 'Error'
                break;
            case 'noExitsProduct':
                textMessage = '¡Oopps, ocurrió un problema!. No encontramos el producto en la base de datos';
                typeMessage = 'Error'
                break;
            case 'errorInsert':
                textMessage = '¡Oopps, ocurrió un problema!. No se pudo insertar el producto';
                typeMessage = 'Error'
                break;
            case 'errorUpdate':
                textMessage = '¡Oopps, ocurrió un problema!. No se pudo actualizar el producto';
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