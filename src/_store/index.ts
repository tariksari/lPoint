import Vuex from 'vuex';

const requireContext = require.context('./modules', true, /.*index.ts$/);

const modules = requireContext
	.keys()
	.map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
	// eslint-disable-next-line @typescript-eslint/ban-types
	.reduce((modules: any, [name, module]): object => {
		const newName = name.replace(/([A-Z])/g, '_$1');
		modules[newName.split('/')[0].toUpperCase()] = module.default;
		return modules;
	}, {});


export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules,
});