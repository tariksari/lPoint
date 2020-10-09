import 'element-plus/lib/theme-chalk/index.css';

import ElementPlus from 'element-plus';
import { createApp } from 'vue';


import store from './_store';
import App from './App.vue';
import router from './router';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
createApp(App).use(ElementPlus).use(store).use(router).mount('#app');
