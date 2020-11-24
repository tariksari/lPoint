import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './_store';
import MainDirective from './_directive'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(MainDirective);

app.mount('#app');