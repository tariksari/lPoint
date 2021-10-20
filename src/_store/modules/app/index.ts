import actions from './actions';
import getters from './getters';
import mutations from './mutations';

type stateType = {
	loader: boolean;
};

const state: stateType = {
	loader: false,
};

export default {
	namespaced: true,
	state,
	actions,
	getters,
	mutations,
};
