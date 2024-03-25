import { ILoginRes } from "../../types/authenticationType";
import { IResData, TAxiosRes } from "../../types/common";
import { baseApi } from "./baseApi";

interface loginInfo {
    email:string
    password:string
}
class AuthenticationService extends baseApi{
    constructor(){
        super();
    }
    login =  (loginInfo:loginInfo) =>{
        return this.post(`authentication/login`,loginInfo) as Promise<TAxiosRes<IResData<ILoginRes>>>;
    }

    loginByCookie = async () =>{
        return this.post('authentication/loginByCookie') as Promise<TAxiosRes<IResData<ILoginRes>>>;
    }
}

export const authenticationService = new AuthenticationService();