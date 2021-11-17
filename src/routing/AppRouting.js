import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Inicio from '../components/inicio';
import Rutas from '../components/rutas';

const AppRouting = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Rutas />} />
                <Route path="/Inicio" element={<Inicio />} />
            </Routes>
        </Router>
    );
}

export default AppRouting;