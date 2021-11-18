import React from "react";
import { NavLink } from "react-router-dom";
import '../assets/css/nav-bar.css';


class NavBar extends React.Component {
    render() {
        return (
            <>
                <nav className="navbar navbar-dark bg-dark">
                    <div className="nav" style={{ margin: "3px" }}>
                        <ul className="nav nav-pills">
                            <li className="nav-item" >
                                <a href="/Inicio" className="nav-link"><em className="far fa-paper-plane"></em>
                                    &nbsp;Gestor de Vuelos Rodriguez
                                </a>
                            </li>
                            <li className="nav-item" role="presentation">
                                <NavLink to={'/Inicio'}>
                                    <button className="btn btn-primary" >Inicio</button>
                                </NavLink>
                            </li> &nbsp;
                            <li className="nav-item" role="presentation">
                                <NavLink to={'/Rutas'}>
                                    <button className="btn btn-primary">Rutas</button>
                                </NavLink>
                            </li> &nbsp;
                            <li className="nav-item" role="presentation">
                                <NavLink to={'/Vuelos'}>
                                    <button className="btn btn-primary">Vuelos</button>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </nav>
            </>
        );
    }
}

export default NavBar