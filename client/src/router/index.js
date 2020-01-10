import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Login from '../views/Login';
import Register from '../views/Register';
import Profile from '../views/Profile';
import Weather from '../views/WeatherPage';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile
    },
    {
        path: '/weather',
        name: 'weather',
        component: Weather
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;
