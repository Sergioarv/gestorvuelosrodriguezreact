import React from "react";
import '../assets/css/nav-bar.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Rutas from "./rutas";
import Inicio from "./inicio";

const route = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Rutas />} />
                <Route path="/Inicio" element={<Inicio />} />
            </Routes>
        </Router>
    );
}

class NavBar extends React.Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="nav" style={{ margin: "3px" }}>
                        {/* <em className="far fa-paper-plane"></em> */}
                        <route>
                            
                        </route>
                    </div>
                </nav>
            </>
        );
    }
}

export default NavBar