import { createApp } from 'vue'

import App from './App.vue'

import PrimeVue from 'primevue/config';
import './assets/style.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css';
import router from "./router/index"

createApp(App)
    .use(PrimeVue)
    .use(router)
    .mount('#app')
