import React from 'react';
import NavBar from './nav-bar';
import '../assets/css/vuelos.css';
import axios from 'axios';

const urlVuelo = 'http://localhost:8080/vuelo';

class Rutas extends React.Component {

    constructor() {
        super()

        this.state = {
            vuelosList: []
        }
    }

    getFilter = () => {
        axios.get(urlVuelo).then(resp => {
            this.setState({ vuelosList: resp.data });
        })
    }

    componentDidMount() {
        this.getFilter();
    }

    render() {
        return (
            <>
                <NavBar />
                <div className="container" style={{ margin: "15px", marginLeft: "10%" }}>
                    <div className="card">
                        <div className="card-header">
                            <h5>Busqueda Avanzada</h5>
                        </div>
                        <div className="card-body">
                            <form className="form-group">
                                <div className="row">
                                    <div className="col-4">
                                        <label>Fecha del Vuelo:</label>
                                        <input type="date" className="form-control" formcontrolname="fecha" required />
                                    </div>
                                    <div className="col-4">
                                        <label>Conector:</label>
                                        <select className="form-control" formcontrolname="conector" required>
                                            <option defaultValue value="">Seleccione un Conector</option>
                                            <option value="AND">Y</option>
                                            <option value="OR">O</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label>Ruta:</label>
                                        <select className="form-control" formcontrolname="ruta" required >
                                            <option defaultValue value="">Seleccione Una ruta</option>
                                            <option value="">
                                                De: nombreCiudad a nombreCiudad
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="invalid feedback col-10">
                                        mensaje
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-12">
                                        <button className="btn btn-buscar">Buscar</button>
                                        &nbsp;
                                        <button className="btn btn-secondary">Limpiar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />

                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-4">
                                    <h5 className="card-title">Lista de Vuelos</h5>
                                </div>
                                <div className="col-8">
                                    <button className="btn btn-primary" routerlink='/vuelos/create'
                                        style={{ float: "right", width: "10rem" }}>Crear</button>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <table className="table table-bordered table-hover">
                                <caption>Lista de Vuelos</caption>
                                <thead className="thead-col">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Fecha del Vuelo</th>
                                        <th scope="col">Aerolinea</th>
                                        <th scope="col">Ruta (Origen - Destino)</th>
                                        <th scope="col" style={{ width: "250px", maxWidth: "maxContent" }}>Operaciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.vuelosList.map(value => {
                                        return (
                                            <tr key={value.idVuelo}>
                                                <td>{value.idVuelo}</td>
                                                <td>{value.fecha_vuelo.toLocaleDateString}</td>
                                                <td>{value.aerolinea_idAerolinea.nombreAerolinea}</td>
                                                <td>{value.ruta_idRuta.origen.nombreCiudad} - {value.ruta_idRuta.destino.nombreCiudad}
                                                </td>
                                                <td>
                                                    <button className="btn btn-edit"><em className="far fa-edit"></em>
                                                        Editar</button>&nbsp; &nbsp;
                                                    <button className="btn btn-danger"><em className="far fa-trash-alt" ></em> Eliminar</button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    <tr>
                                        <td colSpan="5">
                                            <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>No hay lista de Vuelos</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Rutas;