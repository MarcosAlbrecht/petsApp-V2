import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import config from "../util/config";

class UsuarioService{
    
    async login(data){
        return axios({
            url: Config.API_URL +"login",
            method: "GET",
            params:data
        }).then((response) => {
            AsyncStorage.setItem("ID", response.data.id)
            return Promise.resolve(response)
        }).catch((error) => {
            console.warn('entrou no catch da api')
            return Promise.reject(error)
        })
    }

    async loginComToken(data){
        return axios({
            url: Config.API_URL + "usuario/login-token",
            method: "POST",
            timeout: Config.TIMEOUT_REQUEST,
            data: data,
            headers: Config.HEADER_REQUEST
        }).then((response) => {
            if (response.data.access_token){
                AsyncStorage.setItem("TOKEN", response.data.access_token)            
                return Promise.resolve(response)
            }else{
                return Promise.reject(response)
            }
        }).catch((error) => {
            return Promise.reject(error)
        })
    }
}

const usuarioService = new UsuarioService()
export default usuarioService