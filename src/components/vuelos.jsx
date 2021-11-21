import React from 'react';
import NavBar from './nav-bar';
import '../assets/css/vuelos.css';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const urlVuelo = 'http://localhost:8080/vuelo';
const urlRutas = 'http://localhost:8080/ruta';

class Rutas extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            vuelosList: [],
            rutasList: [],
            formFilter: {
                fecha_vuelo: localStorage.getItem('fecha_vuelo') ? JSON.parse(localStorage.getItem('fecha_vuelo')) : '',
                conector: localStorage.getItem('conector') ? JSON.parse(localStorage.getItem('conector')) : '',
                ruta_idRuta: localStorage.getItem('ruta_idRuta') ? JSON.parse(localStorage.getItem('ruta_idRuta')) : ''
            },
            mensajeError: '',
        }
    }

    buscar = () => {
        axios.get(urlVuelo).then(resp => {
            this.setState({ vuelosList: resp.data }, () => {
                localStorage.setItem('fecha_vuelo', JSON.stringify(this.state.formFilter.fecha_vuelo));
                localStorage.setItem('conector', JSON.stringify(this.state.formFilter.conector));
                localStorage.setItem('ruta_idRuta', JSON.stringify(this.state.formFilter.ruta_idRuta));
                localStorage.setItem('vuelosList', JSON.stringify(this.state.vuelosList));
            });
        });
    }

    validarParametrosFiltro(formFilter) {
        if (formFilter.fecha_vuelo !== '' && formFilter.ruta_idRuta !== '' && formFilter.conector === '') {
            return "Por favor seleccione un conector";
        } else if (formFilter.fecha_vuelo === '' && formFilter.ruta_idRuta === '' && formFilter.conector !== '') {
            return "Por favor seleccione una fecha y una ruta";
        } else if (formFilter.conector === '' && formFilter.fecha_vuelo === '' && formFilter.ruta_idRuta === '') {
            return "Por favor seleccione un parámetro de búsqueda";
        } else if ((formFilter.conector !== '' && formFilter.fecha_vuelo !== '' && formFilter.ruta_idRuta === '') ||
            (formFilter.conector !== '' && formFilter.fecha_vuelo === '' && formFilter.ruta_idRuta !== '')) {
            return "Por favor seleccione los 3 parametros de busqueda o quite el conector";
        } else {
            return '';
        }
    }

    obtenerDatos = (e) => {
        this.setState({
            formFilter: {
                ...this.state.formFilter,
                [e.target.name]: e.target.value,
            },
        })
    }

    getRutas = () => {
        axios.get(urlRutas).then(resp => {
            this.setState({ rutasList: resp.data });
        })
    }

    getAllVuelos = () => {
        if (localStorage.getItem('vuelosList') != '') {
            axios.get(urlVuelo).then(resp => {
                this.setState({ vuelosList: resp.data });
            });
        }else{
            this.buscar();
            
        }
    }

    componentDidMount() {
        this.getRutas();
        this.getAllVuelos();
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
                            <form>
                                <div className="row">
                                    <div className="col-4">
                                        <label>Fecha del Vuelo:</label>
                                        <input type="date" className="form-control" name="fecha_vuelo" onChange={(e) => this.obtenerDatos(e)} value={this.state.formFilter.fecha_vuelo} />
                                    </div>
                                    <div className="col-4">
                                        <label>Conector:</label>
                                        <select className="form-control" name="conector" onChange={(e) => this.obtenerDatos(e)}>
                                            <option defaultValue value="">Seleccione un Conector</option>
                                            <option value="AND">Y</option>
                                            <option value="OR">O</option>
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <label>Ruta:</label>
                                        <select className="form-control" name="ruta_idRuta" onChange={(e) => this.obtenerDatos(e)}>
                                            <option defaultValue value="">Seleccione Una ruta</option>
                                            {this.state.rutasList.map(ruta => (
                                                <option key={ruta.idRuta} value={ruta.idRuta}>
                                                    De: {ruta.origen.nombreCiudad} a: {ruta.destino.nombreCiudad}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="invalid feedback col-10">
                                        {this.state.mensajeError !== '' ? (
                                            <p>{this.state.mensajeError}</p>
                                        ) : (
                                            <p></p>
                                        )}
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-12" style={{ textAlign: "left" }}>
                                        <button className="btn btn-buscar" onClick={() => this.buscar()}>Buscar</button>
                                        &nbsp;&nbsp;
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
                                    <Link to={'/Vuelos/create'}>
                                        <button className="btn btn-buscar" style={{ float: "right", width: "10rem" }}>Crear</button>
                                    </Link>
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
                                    {this.state.vuelosList.length > 0 ? (
                                        this.state.vuelosList.map(value => {
                                            return (
                                                <tr key={value.idVuelo}>
                                                    <td>{value.idVuelo}</td>
                                                    <td>{moment(value.fecha_vuelo).format('DD-MM-yyyy')}</td>
                                                    <td>{value.aerolinea_idAerolinea.nombreAerolinea}</td>
                                                    <td>{value.ruta_idRuta.origen.nombreCiudad} - {value.ruta_idRuta.destino.nombreCiudad}
                                                    </td>
                                                    <td>
                                                        <Link to={`/Vuelos/editar/${value.idVuelo}`}>
                                                            <button className="btn btn-edit">
                                                                <em className="far fa-edit"></em> Editar</button>
                                                        </Link>
                                                        &nbsp; &nbsp;
                                                        <button className="btn btn-danger"><em className="far fa-trash-alt" ></em> Eliminar</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    ) : (
                                        <tr>
                                            <td colSpan="5">
                                                <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>No hay vuelos a listar</p>
                                            </td>
                                        </tr>
                                    )}
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