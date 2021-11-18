import React from 'react';
import NavBar from './nav-bar';

class Rutas extends React.Component {
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
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <p>No hay ruta a listar</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </>
        );
    }
}

export default Rutas;