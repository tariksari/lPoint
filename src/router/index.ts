import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import AgendaPage from '../views/Agenda.vue';
import SearchPage from '../views/Search.vue';
import WordInfoPage from '../views/WordInfo.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Main',
		component: AgendaPage,
	},
	{
		path: '/word-info/:word',
		name: 'WordInfo',
		component: WordInfoPage,
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
