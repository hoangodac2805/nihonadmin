import axios from "axios";
import { API_HOST } from "../../ultis";

export class baseApi {
    constructor() { }
    get = (url: string, model?: any) => {
        return axios({
            url: `${API_HOST}${url}`,
            method: "GET",
            data: model,
            withCredentials:true
        })
    }
    post = (url: string, model?: any) => {
        return axios({
            url: `${API_HOST}${url}`,
            method: "POST",
            data: model,
            withCredentials:true
        })
    }
    put = (url: string, model?: any) => {
        return axios({
            url: `${API_HOST}${url}`,
            method: "PUT",
            data: model,
            withCredentials:true
        })
    }
    delete = (url: string, model?: any) => {
        return axios({
            url: `${API_HOST}${url}`,
            method: "DELETE",
            data: model,
            withCredentials:true
        })
    }
}