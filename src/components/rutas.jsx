import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const urlRutas = 'http://localhost:8080/ruta';

export default function Rutas() {

    const [rutasList, setRutasLits] = useState([]);

    let navigate = useNavigate();

    const getAllRutas = () => {
        axios.get(urlRutas).then(resp => {
            setRutasLits(resp.data);
        });
    }

    function prueba(idRuta){
        navigate(`/Vuelos${idRuta}`);
    }

    useEffect( () => {
        getAllRutas();
    }, [])

    return (
        <>
            <div className="container" style={{ margin: "15px", marginLeft: "10%" }}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Lista de Rutas</h5>
                        <table className="table table-bordered table-hover" >
                            <caption>Lista de Rutas</caption>
                            <thead className="thead-col">
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Origen</th>
                                    <th scope="col">Destino</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rutasList.length > 0 ? (
                                    rutasList.map(value => {
                                        return (
                                            <tr key={value.idRuta} onClick={() => prueba(value.idRuta)}>
                                                <td>{value.idRuta}</td>
                                                <td>{value.origen.nombreCiudad}</td>
                                                <td>{value.destino.nombreCiudad}</td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5">
                                            <p style={{ textAlign: "center", fontSize: "18px", color: "red" }}>No hay rutas a listar</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
}