import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import config from 'devextreme/core/config';
import './assets/main.css';
import { licenseKey } from './devextreme-license';

config({ licenseKey });

const app = createApp(App);

app.use(router);

app.mount('#app');
