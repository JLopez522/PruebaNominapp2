import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './login';
import Register from './register';
import Home from './home';

export default function Initiation() {

    function getRouters() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="Register" element={<Register />} />
                    <Route path="Home/*" element={<Home />} />
                    <Route path="*" element={<h1>Pagina no enconrtada</h1>} />
                </Routes>
            </BrowserRouter>
        );
    }

    return getRouters();
}