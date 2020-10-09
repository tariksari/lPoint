import { createApp } from 'vue';
import Vuex from 'vuex';

const app = createApp({});

// @ts-ignore
app.use(Vuex);

const requireContext = require.context('./modules', true, /.*\index.ts$/);

interface index {
	newName: object;
}

const modules = requireContext
	.keys()
	.map((file) => [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)])
	.reduce((modules: any, [name, module]): object => {
		const newName = name.replace(/([A-Z])/g, '_$1');
		modules[newName.split('/')[0].toUpperCase()] = module.default;
		return modules;
	}, {});

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules,
});
