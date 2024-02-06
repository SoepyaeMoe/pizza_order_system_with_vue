import { createRouter, createWebHistory } from 'vue-router';
import LoginComponent from '../components/LoginComponent.vue';
import RegisterComponent from '../components/RegisterComponent.vue';
import HomeComponent from '../components/HomeComponent.vue';
import ProductDetailComponent from '../components/ProductDetailComponent.vue';
import CartComponent from '../components/CartComponent.vue';
import HistoryComponent from '../components/HistoryComponent.vue';
import NotFound from '../components/NotFound.vue';
import ContactComponent from '../components/ContactComponent.vue';

const isAuthenticated = () => {
    if (localStorage.getItem('token')) {
        return true;
    } else {
        return { path: '/login' }
    }
}

const routes = [
    { path: '/', component: LoginComponent },
    { path: '/login', component: LoginComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/home', component: HomeComponent, beforeEnter: isAuthenticated },
    { path: '/contact', component: ContactComponent, beforeEnter: isAuthenticated },
    { path: '/products/:id', component: ProductDetailComponent, beforeEnter: isAuthenticated },
    { path: '/cart', component: CartComponent, beforeEnter: isAuthenticated },
    { path: '/history', component: HistoryComponent, beforeEnter: isAuthenticated },
    { path: '/:pathMatch(.*)*', component: NotFound, beforeEnter: isAuthenticated }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;