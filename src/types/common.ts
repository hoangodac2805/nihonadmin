import  {AxiosResponse} from 'axios';

export type TAxiosRes<D> = Omit<AxiosResponse,"data"> & {
    data: D
};


export interface IResData<D> {
    status: boolean,
    data?: D,
    message?: string
}

