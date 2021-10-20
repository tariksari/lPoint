import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from './_store';
import MainDirective from './_directive'
import VueFinalModal from 'vue-final-modal'

const app = createApp(App);

app.use(store);
app.use(router);
app.use(MainDirective);
app.use(VueFinalModal())

app.mount('#app');
