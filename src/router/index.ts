import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import DictionaryIndexPage from '../views/DictionaryIndex.vue';
import SearchPage from '../views/Search.vue';
import WordInfo from '../views/WordInfo.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Main',
		component: DictionaryIndexPage,
	},
	{
		path: '/word-info/:word',
		name: 'WordInfo',
		component: WordInfo,
	},
	{
		path: '/search',
		name: 'SearchPage',
		component: SearchPage,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
