import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

import './assets/main.css';

const app = createApp(App);

app.use(router);

app.mount('#app');
