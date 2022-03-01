
import React, { useState, useEffect } from 'react';
import ListProductService from '../service/list.product';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/loading';
import { Message } from '../components/message';
import IconProduct from '../assets/Imagen/svg/010-discount.svg';
import '../style/list.product.style.css';

export default function ListProduct(props) {

    const [viewSelected, setViewSelected] = useState('Body');
    const [textMessage, setTextMessage] = useState('');
    const [typeMessage, setTypeMessage] = useState('');
    const [dataProducts, setDataProducts] = useState([]);

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
            <div className="margin-medium margin-large margin-extra-large margin-grande">
                <div className="content-title-body">
                    <span>Lista productos</span>
                    <div className="content-separator"></div>
                </div>
                <div className="content-body">
                    {
                        dataProducts.map((input) => {
                            return (
                                <div className="col-4 col-s-6"
                                    key={input.id}
                                    onClick={() => {
                                        props.setModuleSelected('DetailProduct');
                                        navigate('/Home/Product/Detail', {
                                            state: {
                                                id: input.id,
                                                operation: 'Search'
                                            }
                                        })
                                    }}>
                                    <div className="card-option">
                                        <div className="card-img">
                                            <div>
                                                <img src={IconProduct} />
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <span>{input.descripcion}</span>
                                            <div className="content-separator-card"></div>
                                            <p>El codigo es {input.codigo}, con inventario {input.inventario} a un precio de {input.precio} </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }

    useEffect(() => {
        initModule();
    }, []);

    function initModule() {
        getProducts();
    }

    function getProducts() {
        setViewSelected('Loading');
        setTimeout(() => {
            ListProductService.getProducts()
                .then((input) => {
                    getProductsCallback(input);
                }).catch((error) => {
                    showMessage('error');
                });
        }, 2000)
    }

    function getProductsCallback(input) {
        setDataProducts(input);
        setViewSelected('Body');
    }

    function showMessage(messageActive) {

        let textMessage = '';
        let typeMessage = '';

        switch (messageActive) {
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