import axios from "axios";

export class RutasServcie {

    URL = 'http://localhost:8080/ruta';

    getRutas(){
        return axios.get(this.URL).then( resp => resp.data);
    }

}