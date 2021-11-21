import React, { useEffect, useState } from 'react';
import '../assets/css/vuelos.css';
import axios from 'axios';
import moment from 'moment';
import { Link, useParams, useNavigate } from 'react-router-dom';

const urlVuelo = 'http://localhost:8080/vuelo';
const urlRutas = 'http://localhost:8080/ruta';

export default function Vuelos() {

    const [vuelosList, setVuelosList] = useState([]);
    const [rutasList, setRutasList] = useState([]);
    const [mensajeError, setMensajeError] = useState('');
    const [fecha_vuelo, setFecha_vuelo] = useState('');
    const [conector, setConector] = useState('');
    const [ruta_idRuta, setRuta_idRuta] = useState('');

    let parameter = useParams();
    let navigate = useNavigate();

    const buscar = (e) => {
        setMensajeError(validarParametrosFiltro());
        e.preventDefault();
        let params = '';
        params = fecha_vuelo !== '' ? (params.length > 0 ? params.concat('&fechaVuelo=').concat(fecha_vuelo) : params.concat('?fechaVuelo=').concat(fecha_vuelo)) : params;
        params = ruta_idRuta !== '' ? (params.length > 0 ? params.concat('&idRuta=').concat(ruta_idRuta) : params.concat('?idRuta=').concat(ruta_idRuta)) : params;
        params = conector !== '' ? (params.length > 0 ? params.concat('&conector=').concat(conector) : params.concat('?conector=').concat(conector)) : params;

        axios.get(urlVuelo + '/filterVuelos' + params).then(resp => {
            setVuelosList(resp.data);
        });
    }

    const validarParametrosFiltro = () => {
        if (fecha_vuelo !== '' && ruta_idRuta !== '' && conector === '') {
            return "Por favor seleccione un conector";
        } else if (fecha_vuelo === '' && ruta_idRuta === '' && conector !== '') {
            return "Por favor seleccione una fecha y una ruta";
        } else if (conector === '' && fecha_vuelo === '' && ruta_idRuta === '') {
            return "Por favor seleccione un parámetro de búsqueda";
        } else if ((conector !== '' && fecha_vuelo !== '' && ruta_idRuta === '') ||
            (conector !== '' && fecha_vuelo === '' && ruta_idRuta !== '')) {
            return "Por favor seleccione los 3 parametros de busqueda o quite el conector";
        } else {
            return '';
        }
    }

    const limpiar = (e) => {
        e.preventDefault();
        document.getElementById("filterForm").reset();
        setMensajeError('');
        setFecha_vuelo('');
        setConector('');
        setRuta_idRuta('');
        axios.get(urlVuelo + '/filterVuelos').then(resp => {
            setVuelosList(resp.data);
        });
    }

    const obtenerDatos = (e) => {
        let name = e.target.name;

        if (name === 'fecha_vuelo') {
            setFecha_vuelo(e.target.value);
        }

        if (name === 'conector') {
            setConector(e.target.value);
        }

        if (name === 'ruta_idRuta') {
            setRuta_idRuta(e.target.value);
        }

        console.log(validarParametrosFiltro());
    }

    const eliminar = (value) => { 
        axios.delete(urlVuelo, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: value,
        }).then( 
            window.location.reload()
            );
    }

    const getRutas = () => {
        axios.get(urlRutas).then(resp => {
            setRutasList(resp.data);
        })
    }

    const getAllVuelos = () => {
        setRuta_idRuta(parameter.id === undefined ? '' : parameter.id);
        let ruta = ruta_idRuta !== '' ? '?idRuta='+ruta_idRuta : '';
        axios.get(urlVuelo+'/filterVuelos'+ruta).then(resp => {
            setVuelosList(resp.data);
        });
    }

    useEffect(() => {
        getAllVuelos();
        getRutas();
    },[]);

    return (
        <>
            <div className="container" style={{ margin: "15px", marginLeft: "10%" }}>
                <div className="card">
                    <div className="card-header">
                        <h5>Busqueda Avanzada</h5>
                    </div>
                    <div className="card-body">
                        <form id="filterForm">
                            <div className="row">
                                <div className="col-4">
                                    <label>Fecha del Vuelo:</label>
                                    <input type="date" className="form-control" name="fecha_vuelo" onChange={(e) => obtenerDatos(e)} />
                                </div>
                                <div className="col-4">
                                    <label>Conector:</label>
                                    <select className="form-control" name="conector" onChange={(e) => obtenerDatos(e)}>
                                        <option defaultValue value="">Seleccione un Conector</option>
                                        <option value="AND">Y</option>
                                        <option value="OR">O</option>
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Ruta:</label>
                                    <select className="form-control" name="ruta_idRuta" onChange={(e) => obtenerDatos(e)} value={ruta_idRuta}>
                                        <option defaultValue value="">Seleccione Una ruta</option>
                                        {rutasList.map(ruta => (
                                            <option key={ruta.idRuta} value={ruta.idRuta}>
                                                De: {ruta.origen.nombreCiudad} a: {ruta.destino.nombreCiudad}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="invalid feedback col-10">
                                    {mensajeError !== '' ? (
                                        <p>{mensajeError}</p>
                                    ) : (
                                        <p></p>
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12" style={{ textAlign: "left" }}>
                                    <button className="btn btn-buscar" onClick={(e) => buscar(e)}>Buscar</button>
                                    &nbsp;&nbsp;
                                    <button className="btn btn-secondary" onClick={(e) => limpiar(e)}>Limpiar</button>
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
                                {vuelosList.length > 0 ? (
                                    vuelosList.map(value => {
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
                                                    <button className="btn btn-danger" onClick={() => eliminar(value)}><em className="far fa-trash-alt" ></em> Eliminar</button>
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