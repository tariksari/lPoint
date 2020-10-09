export const API_CONFIG = {
	returnRejectedPromiseOnError: true,
	withCredentials: false,
	crossdomain: true,
	timeout: 30000,
	baseURL: 'http://localhost:4000/api/',
	headers: {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Headers':
			'Origin, X-Requested-With, Content-Type, Accept',
		'Cache-Control': 'no-cache, no-store, must-revalidate',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
		Pragma: 'no-cache',
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
};
