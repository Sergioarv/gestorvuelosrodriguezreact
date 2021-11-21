import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./nav-bar";

export default class Inicio extends React.Component {
    render() {
        return (
            <>
                <NavBar />
                <div className="container" style={{ margin: "15px" }}>
                    <div className="row">
                        <div className="col-sm-3">
                            <Link to={'/Rutas'}>
                                <div className="card text-center" style={{ maxWidth: "18rem" }}>
                                    {/* Imagen tomada de la base de imagenes shutterstock */}
                                    <img src='https://image.shutterstock.com/z/stock-vector--d-top-view-of-a-map-with-destination-location-point-aerial-clean-top-view-of-the-day-time-city-1890043630.jpg'
                                        className="card-img-center" alt="Propiedad de shutterstock" style={{ height: "14rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">Rutas</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-sm-3">
                            <Link to={'/Vuelos'}>
                                <div className="card text-center" style={{ maxWidth: "18rem" }}>
                                    {/* Imagen tomada de la base de imagenes shutterstock */}
                                    <img src="https://image.shutterstock.com/z/stock-vector-airplane-vector-icon-1297054468.jpg"
                                        className="card-img-center" alt="Propiedad de shutterstock" style={{ height: "14rem" }} />
                                    <div className="card-body">
                                        <h5 className="card-title">Vuelos</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}