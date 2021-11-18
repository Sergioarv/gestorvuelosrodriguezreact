import React from 'react';
import NavBar from './nav-bar';
import axios from 'axios';

const urlRutas = 'http://localhost:8080/ruta';

export default class Rutas extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            rutasList: []
        }
    }

    getAllRutas = () => {
        axios.get(urlRutas).then(resp => {
            this.setState({ rutasList: resp.data });
        });
    }

    prueba = (value) => {
       return console.log("La prueba", value);
    }

    componentDidMount() {
        this.getAllRutas();
    }

    render() {
        return (
            <>
                <NavBar />
                <div className="container" style={{ margin: "15px", marginLeft: "10%" }}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Lista de Rutas</h5>
                            <table className="table table-bordered table-hover">
                                <caption>Lista de Rutas</caption>
                                <thead className="thead-col">
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Origen</th>
                                        <th scope="col">Destino</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.rutasList.map(value => {
                                        return (
                                        <tr key={value.idRuta} onClick={() => this.prueba(value)}>
                                            <td>{value.idRuta}</td>
                                            <td>{value.origen.nombreCiudad}</td>
                                            <td>{value.destino.nombreCiudad}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan="5">
                                            <p>No hay ruta a listar</p>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}