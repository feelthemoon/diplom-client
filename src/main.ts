import { createApp } from 'vue';
import { createPinia } from 'pinia';

import 'ant-design-vue/dist/reset.css';

import router from '@/app/config/router';

import App from '@/app.vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
