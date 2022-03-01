
import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "../components/navbar";
import Profile from "./profile";
import ListProduct from "./list.product";
import DetailProduct from "./detail.product";
import Utils from '../utils/utils';

export default function Home() {

    const [moduleSelected, setModuleSelected] = useState('Perfil')

    const user = Utils.getCookie('user');

    console.log(user)

    let navigate = useNavigate();

    function getView() {
        return (
            <div id="Content_General">
                <NavBar
                    moduleSelected={moduleSelected}
                    setModuleSelected={setModuleSelected}
                />
                <div id="Content_Body">
                    <Routes>
                        <Route path="Perfil" element={<Profile user={user} />} />
                        <Route path="Product">
                            <Route path="ListProduct" element={
                                <ListProduct
                                    setModuleSelected={setModuleSelected} />
                            } />
                            <Route path="Detail" element={<DetailProduct />} />
                        </Route>
                    </Routes>
                </div>
            </div>
        );
    }

    useEffect(() => {
        initModule();
    }, []);

    function initModule() {
        if (!user) {
            navigate('/');
        }
    }

    return getView();
}