import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './nav-bar';

const urlRutas = 'http://localhost:8080/ruta';
const urlAerolineas = 'http://localhost:8080/aerolinea';

export default class VuelosEdit extends React.Component {

    constructor({match, ...props}) {
        super(props)

        this.state = {
            aerolineaList: [],
            rutasList: [],
        };
    }

    getAerolinea = () => {
        axios.get(urlAerolineas).then(resp => {
            this.setState({ aerolineaList: resp.data });
        });
    }

    getRutas = () => {
        axios.get(urlRutas).then(resp => {
            this.setState({ rutasList: resp.data });
        });
    }

    componentDidMount() {
        this.getAerolinea();
        this.getRutas();

    }

    render() {
        return (
            <>
                <NavBar />
                <div className="container" style={{ margin: "15px", marginLeft: "10%" }}>
                    <div className="card">
                        <div className="card-header"><h5>Editar vuelo</h5>
                        </div>
                        <div className="card-body">
                            <form className="form-group">
                                <div className="row">
                                    <div className="col-3" hidden="true">
                                        <label>Id:</label>
                                        <input type="text" className="form-control" value="" />
                                    </div>
                                    <div className="col-4">
                                        <label>Fecha del vuelo:</label>
                                        <input type="date" className="form-control" formControlName="fecha"
                                            value="{{ dateNow | date: 'yyyy-MM-dd' }}" required />
                                    </div>
                                    <div className="col-4">
                                        <label>Aerolinea:</label>
                                        <select className="form-control" formControlName="aerolinea" required>
                                            <option defaultValue value="">Seleccione Una Aerolinea</option>
                                            {this.state.aerolineaList.map(aero => (
                                                <option key={aero.id_aerolinea} value={aero.id_aerolinea}>
                                                    {aero.nombreAerolinea}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label>Ruta:</label>
                                        <select className="form-control" formControlName="ruta" required>
                                            <option defaultValue value="">Seleccione Una ruta</option>
                                            {this.state.rutasList.map(ruta => (
                                                <option key={ruta.idRuta} value={ruta.idVuta}>
                                                    De: {ruta.origen.nombreCiudad} a: {ruta.destino.nombreCiudad}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="row" style={{ float: "right" }}>
                                <div className="col-12">
                                    <button className="btn btn-success">Guardar Cambios</button>
                                    &nbsp;
                                    <Link to='/Vuelos'>
                                        <button className="btn btn-danger" routerLink='/vuelos'>Cancelar</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}