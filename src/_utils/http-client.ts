import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { API_CONFIG } from '@/_utils/api.config';

class Axios {
	public readonly instance: AxiosInstance;

	public constructor() {
		this.instance = axios.create(API_CONFIG);

		this.initializeResponseInterceptor();
	}

	private initializeResponseInterceptor = () => {
		this.instance.interceptors.response.use(
			({ data }: AxiosResponse) => data,
			(error) => Promise.reject(error)
		);
	};
}

export default new Axios().instance;
