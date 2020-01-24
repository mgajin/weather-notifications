import Axios from 'axios';

const state = {
    user: {},
    token: ''
};

const getters = {
    getUser: state => state.user,
    getToken: state => state.token
};

const actions = {
    // Login user
    SIGN_IN({ commit }, payload) {
        Axios.post('http://localhost:3000/user/v1/auth/login', {
            username: payload.username,
            password: payload.password
        })
            .then(response => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem('jwt', response.data.token);
                commit('set_user', response.data.user);
            })
            .catch(err => alert(err));
    },
    // Register new user
    SIGN_UP({ commit }, payload) {
        Axios.post('http://localhost:3000/user/v1/auth/register', {
            username: payload.username,
            email: payload.email,
            password: payload.password,
            password2: payload.password2
        })
            .then(response => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                localStorage.setItem('jwt', response.data.token);
                commit('set_user', response.data.user);
            })
            .catch(err => alert(err));
    },
    SIGN_OUT({ commit }) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        commit('set_user', null);
    },
    // Get logged user
    GET_USER({ commit }) {
        const user = JSON.parse(localStorage.getItem('user'));
        commit('set_user', user);
    },
    // Add city to subscription list
    SUBSCRIBE({ commit }, payload) {
        Axios.put('http://localhost:3000/user/v1/service/subscribe', {
            username: payload.username,
            city: payload.city
        })
            .then(response => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                commit('set_user', response.data.user);
            })
            .catch(err => alert(err));
    },
    // Remove city from subscription list
    REMOVE({ commit }, payload) {
        Axios.put('http://localhost:3000/user/v1/service/remove', {
            username: payload.username,
            city: payload.city
        })
            .then(response => {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.data.user)
                );
                commit('set_user', response.data.user);
            })
            .catch(err => alert(err));
    }
};

const mutations = {
    set_user: (state, user) => {
        state.user = user;
        state.token = localStorage.getItem('jwt');
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
