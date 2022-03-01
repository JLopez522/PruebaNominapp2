
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Utils from '../utils/utils';
import IconPerfil from '../assets/Imagen/svg/002-dollar.svg';
import IconProductos from '../assets/Imagen/svg/004-shopping bag.svg';
import IconNomina from '../assets/Imagen/svg/050-shopping cart.svg';
import IconEmpresa from '../assets/Imagen/svg/006-shopping basket.svg';
import IconSuscripcion from '../assets/Imagen/svg/027-store.svg';
import IconAyuda from '../assets/Imagen/svg/038-diamond.svg';
import IconOtraCosa from '../assets/Imagen/svg/054-tshirt.svg';
import '../style/components/navbar.style.css';

export default function NavBar(props) {

    let navigate = useNavigate();

    return (
        <div id="Content_Menu_Left">
            <div id="Content_Menu">
                <div id="Content_Logo" className="content-option-oval">
                    <img src="https://app.nominapp.com/static/media/isotipo_amarillo.6ad06d43.svg" />
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "Perfil" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('Perfil');
                        navigate('/Home/Perfil');
                    }}>
                    <img src={IconPerfil} />
                    <span>Panel usuario</span>
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "Products" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('Products');
                        navigate('/Home/Product/ListProduct');
                    }}>
                    <img src={IconProductos} />
                    <span>Productos</span>
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "DetailProduct" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('DetailProduct');
                        navigate('/Home/Product/Detail', {
                            state: {
                                operation: 'Create'
                            }
                        });
                    }}>
                    <img src={IconNomina} />
                    <span>Crear producto</span>
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "Empresa" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('Empresa');
                        navigate('/Home/Product/ListProduct');
                    }}>
                    <img src={IconEmpresa} />
                    <span>Empresa</span>
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "Suscripcion" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('Suscripcion');
                        navigate('/Home/Product/ListProduct');
                    }}>
                    <img src={IconSuscripcion} />
                    <span>Suscripcion</span>
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "Ayuda" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('Ayuda');
                        navigate('/Home/Product/ListProduct');
                    }}>
                    <img src={IconAyuda} />
                    <span>Ayuda</span>
                </div>
                <div
                    className={"content-option-menu" + (props.moduleSelected === "OtraCosa" ? " content-option-menu-selected" : "")}
                    onClick={() => {
                        props.setModuleSelected('OtraCosa');
                        navigate('/Home/Product/ListProduct');
                    }}>
                    <img src={IconOtraCosa} />
                    <span>Otra cosa</span>
                </div>
                <div id="Content_Logout" className="content-option-oval"
                    onClick={() => {
                        Utils.removeCookie('user');
                        navigate('/')
                    }}><div><span>S</span></div></div>
            </div>
        </div>
    );
}