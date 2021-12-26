import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import AgendaPage from '../views/Agenda.vue';
import SearchPage from '../views/Search.vue';
import WordInfoPage from '../views/WordInfo.vue';
import SettingPage from '../views/Setting.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Main',
		component: AgendaPage,
	},
	{
		path: '/info/:word',
		name: 'WordInfo',
		component: WordInfoPage,
	},
	{
		path: '/search',
		name: 'SearchPage',
		component: SearchPage
	},
		{
		path: '/settings',
		name: 'setting',
		component: SettingPage
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
