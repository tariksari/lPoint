import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import store from '../_store/index'

import { API_CONFIG } from '@/_utils/api.config';

class Axios {
	public readonly instance: AxiosInstance;

	public constructor() {
		this.instance = axios.create(API_CONFIG);
		this.initializeResponseInterceptor();
	}

	private initializeResponseInterceptor = () => {
		this.instance.interceptors.request.use(
			(req) => {
				 store.dispatch('APP/ACTION_LOADER_STATUS', true);
				 return req;	
			},
			(error) =>{
				store.dispatch('APP/ACTION_LOADER_STATUS', false);
				return Promise.reject(error)
			});

		this.instance.interceptors.response.use(
			({ data }: AxiosResponse) => {
				store.dispatch('APP/ACTION_LOADER_STATUS', false);
				return data;
			},
			(error) =>{
				store.dispatch('APP/ACTION_LOADER_STATUS', false);
				return Promise.reject(error)
			});
	};
}

export default new Axios().instance;
