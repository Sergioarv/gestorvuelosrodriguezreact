import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from '../components/inicio';
import Rutas from '../components/rutas';
import Vuelos from "../components/vuelos";
import VuelosEdit from '../components/vuelosedit';
import VuelosCreate from '../components/vueloscreate';

const AppRouting = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Inicio />} />
                <Route exact path="/Inicio" element={<Inicio />} />
                <Route path="/Rutas" element={<Rutas />} />
                <Route path="/Vuelos" element={<Vuelos />} />
                <Route path="/Vuelos/editar/:id" element={<VuelosEdit/> }/>
                <Route path="/Vuelos/create" element= {<VuelosCreate/>} />
            </Routes>
        </Router>
    );
}

export default AppRouting;