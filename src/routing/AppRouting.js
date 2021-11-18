import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from '../components/inicio';
import Rutas from '../components/rutas';
import Vuelos from "../components/vuelos";

const AppRouting = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/Inicio" element={<Inicio />} />
                <Route path="/Rutas" element={<Rutas />} />
                <Route path="/Vuelos" element={<Vuelos />} />
            </Routes>
        </Router>
    );
}

export default AppRouting;