import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const urlRutas = 'http://localhost:8080/ruta';
const urlAerolineas = 'http://localhost:8080/aerolinea';
const urlVuelo = 'http://localhost:8080/vuelo';

export default function VuelosEdit({ props }) {

    const [aerolineaList, setAerolineaList] = useState([]);
    const [rutasList, setRutasList] = useState([]);
    const [fecha_vuelo, setFecha_vuelo] = useState('');
    const [aerolinea, setAerolinea] = useState('');
    const [ruta_idRuta, setRuta_idRuta] = useState('');
    const [vuelo, setVuelo] = useState('');
    const [mensajeError, setMensajeError] = useState('');

    let parameter = useParams();
    let navigate = useNavigate();

    const getAerolinea = () => {
        axios.get(urlAerolineas).then(resp => {
            setAerolineaList(resp.data);
        });
    }

    const getRutas = () => {
        axios.get(urlRutas).then(resp => {
            setRutasList(resp.data);
        });
    }

    const cargarDatos = () => {
        axios.get(urlVuelo + "/" + parameter.id).then(resp => {
            setAerolinea(resp.data.aerolinea_idAerolinea.id_aerolinea);
            setFecha_vuelo(moment(resp.data.fecha_vuelo).format('yyyy-MM-DD'));
            setRuta_idRuta(resp.data.ruta_idRuta.idRuta);
            setVuelo(resp.data);
        });
    }

    const obtenerDatos = (e) => {

        let name = e.target.name;

        if (name === 'fecha_vuelo') {
            setFecha_vuelo(e.target.value);
        }

        if (name === 'aerolinea') {
            setAerolinea(e.target.value);
        }

        if (name === 'ruta_idRuta') {
            setRuta_idRuta(e.target.value);
        }

    }

    const guardarCambios = (e) => {
        e.preventDefault();

        if (fecha_vuelo !== '' && aerolinea !== '' && ruta_idRuta !== '') {
            vuelo.aerolinea_idAerolinea.id_aerolinea = aerolinea;
            vuelo.fecha_vuelo = fecha_vuelo;
            vuelo.ruta_idRuta.idRuta = ruta_idRuta;

            axios.put(urlVuelo, vuelo).then(resp => {
                setMensajeError('');
                navigate('/Vuelos');
            });

        } else {
            setMensajeError('Por favor ingrese todos los campos');
        }

    }

    useEffect(() => {
        getAerolinea();
        getRutas();
        cargarDatos();
    }, []);

    return (
        <>
            <div className="container" style={{ margin: "15px", marginLeft: "10%" }}>
                <div className="card">
                    <div className="card-header"><h5>Editar vuelo</h5>
                    </div>
                    <div className="card-body">
                        <form className="form-group">
                            <div className="row">
                                <div className="col-3" hidden>
                                    <label>Id:</label>
                                    <input type="text" className="form-control" defaultValue="" />
                                </div>
                                <div className="col-4">
                                    <label>Fecha del vuelo:</label>
                                    <input type="date" className="form-control" name="fecha_vuelo" onChange={(e) => obtenerDatos(e)} value={fecha_vuelo} />
                                </div>
                                <div className="col-4">
                                    <label>Aerolinea:</label>
                                    <select className="form-control" name="aerolinea" value={aerolinea} onChange={(e) => obtenerDatos(e)}>
                                        <option defaultValue='' disabled >Seleccione Una Aerolinea</option>
                                        {aerolineaList.map(aero => (
                                            <option key={aero.id_aerolinea} value={aero.id_aerolinea}>
                                                {aero.nombreAerolinea}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-4">
                                    <label>Ruta:</label>
                                    <select className="form-control" name="ruta_idRuta" value={ruta_idRuta} onChange={(e) => obtenerDatos(e)}>
                                        <option defaultValue='' disabled >Seleccione Una ruta</option>
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
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="row" style={{ float: "right" }}>
                            <div className="col-12">
                                <button className="btn btn-success" onClick={(e) => guardarCambios(e)}>Guardar Cambios</button>
                                &nbsp;
                                <Link to='/Vuelos'>
                                    <button className="btn btn-danger">Cancelar</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}