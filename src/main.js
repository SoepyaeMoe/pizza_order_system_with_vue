import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/app';
import Master from '../src/layouts/Master.vue';

import 'mdb-ui-kit/css/mdb.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import VueProgressBar from "@aacassandra/vue3-progressbar";

// dots loading 
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import 'sweetalert2/dist/sweetalert2.all.min.js';

const options = {
    color: '#3B71CA',
    failedColor: 'red',
    height: '5px',
    thickness: '3px',
    autoRevert: true,
    inverse: false,
};

import axios from 'axios';
// Configure the default headers for axios:
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
// the base URL for all axios requests:
axios.defaults.baseURL = 'http://localhost:8000/api';
// If there's a token in the localStorage, set it as the default Authorization header:
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}
// Handle token expiration or invalid tokens:
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            axios.defaults.headers.common['Authorization'] = 'Bearer';
            this.$router.push({ name: 'login' });
        }
        return Promise.reject(error);
    }
);

const app = createApp(App);
app.component('master-component', Master);
app.use(VueProgressBar, options);
app.use(LoadingPlugin);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount('#app');
